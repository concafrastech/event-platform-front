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
import { NgxSpinnerService } from "ngx-spinner";

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
  public isLoading: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _contentService: ContentService,
    private _userService: UserService,
    private _stageService: StageService,
    private _bsLocaleService: BsLocaleService,
    private _documentService: DocumentService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Adicionar Painel";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: activity-add.");
    this._spinner.show();
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
      [],
      new Date(),
      new Date()
    );
    this.loadPage();
    
  }

  loadPage() {
    this._stageService.getFullStages().subscribe(
      (response) => {
        if (response) {
          this.stages = response.stages;
          this._spinner.hide();
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
    this._spinner.show();
    this.saveDocuments();
  }

  //Realiza upload e salva os documentos
  saveDocuments() {
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
        this._spinner.hide();
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      },
      complete: () => this.saveContents(),
    });
  }

  //Salva os conteúdos
  saveContents() {
    let index = 0;
    this._contentService.saveContents(this.activity.contents).subscribe({
      next: (content) => {
        this.activity.contents[index]._id = content.content._id;
        index += 1;
      },
      error: (error) => {
        this._spinner.hide();
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      },
      complete: () => this.saveActivity(),
    });
  }

  //Salva o painel
  saveActivity() {
    this._activityService.addActivity(this.activity).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.activity) {
          this.status = "error";
        } else {
          this.status = "success";
          this._router.navigate(["/admin/activity/edit", response.activity._id]);
        }
      },
      (error) => {
        this.deleteDocuments();
        this.deleteContents();
        this._spinner.hide();
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

  //Apaga conteúdos
  deleteContents() {
    this.activity.contents.forEach((content) => {
      if (content.file) {
        this._contentService.deleteContent(content._id).subscribe();
      }
    });
  }
}
