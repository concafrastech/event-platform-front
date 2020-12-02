import { ContentService } from "../../../services/content.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Stage } from "src/app/models/stage";
import { Activity } from "src/app/models/activity";
import { StageService } from "src/app/services/stage.service";
import { ActivityService } from "src/app/services/activity.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { HttpEventType } from "@angular/common/http";
import { DocumentService } from "src/app/services/document.service";

@Component({
  selector: "app-activity-add",
  templateUrl: "./activity-add.component.html",
  styleUrls: ["./activity-add.component.css"],
  providers: [
    UserService,
    ActivityService,
    StageService,
    ContentService,
    DocumentService,
  ],
})
export class ActivityAddComponent implements OnInit {
  public title: string;
  public activityId: string;
  public url: string;
  public status: string;
  public activity: Activity;
  public identity: string;
  public stages = [];
  public alturaTela: number;
  public contentIsValid: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _contentService: ContentService,
    private _userService: UserService,
    private _stageService: StageService,
    private _bsLocaleService: BsLocaleService,
    private _documentService: DocumentService
  ) {
    this.title = "Adicionar Painel";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: activity-add.");
    this.identity = this._userService.getIdentity();
    this.activity = new Activity(
      "",
      0,
      "",
      "",
      "",
      "",
      new Date(),
      new Date(),
      false,
      null,
      [],
      new Date(),
      new Date()
    );
    this.activity.stage = new Stage(
      "",
      0,
      "",
      "",
      "",
      null,
      new Date(),
      new Date()
    );
    this.loadPage();

    //Adicionado altura da tela apenas para forçar a criação da barra de rolagem, rever css
    this.alturaTela =
      window.innerHeight > 0 ? window.innerHeight : screen.height;
  }

  loadPage() {
    this._stageService.getStages().subscribe(
      (response) => {
        if (response) {
          this.stages = response.stages;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  contentFormIsValid(event: boolean) {
    return (this.contentIsValid = event);
  }

  onSubmit() {
    let index = 0;
    this._contentService.uploadContents(this.activity.contents).subscribe({
      next: (response) => {
        //Final do upload
        if (response.type == HttpEventType.Response) {
          this.activity.contents[index].file = response.body.document;
          this.activity.contents[index].fileToUpload = null;
          index += 1;
        }
      },
      error: (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      },
      complete: () => this.saveActivity(),
    });
  }

  saveActivity() {
    this._activityService.addActivity(this.activity).subscribe(
      (response) => {
        if (!response.activity) {
          this.status = "error";
        } else {
          this.status = "success";
          this._router.navigate(["/admin/activity/edit", response.activity._id]);
        }
      },
      (error) => {
        this.deleteDocuments();
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  //Apaga documentos dos conteúdos
  deleteDocuments() {
    this.activity.contents.forEach((content) => {
      if (content.file) {
        this._documentService.deleteDocument(content.file._id).subscribe();
      }
    });
  }
}
