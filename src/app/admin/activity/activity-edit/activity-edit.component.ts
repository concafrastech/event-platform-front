import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Stage } from 'src/app/models/stage';
import { Activity } from "src/app/models/activity";
import { StageService } from "src/app/services/stage.service";
import { ActivityService } from "src/app/services/activity.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { ContentService } from 'src/app/services/content.service';
import { DocumentService } from 'src/app/services/document.service';
import { Content } from 'src/app/models/content';
import { HttpEventType } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-activity-edit",
  templateUrl: "./activity-edit.component.html",
  styleUrls: ["./activity-edit.component.css"],
  providers: [UserService, ActivityService, StageService, ContentService,
    DocumentService,],
})
export class ActivityEditComponent implements OnInit {
  public title: string;
  public activityId: string;
  public url: string;
  public status: string;
  public activity: Activity;
  public identity: string;
  public contentIsValid: boolean = false;
  public alturaTela;
  public isLoading: boolean = true;
  public stages = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _userService: UserService,
    private _stageService: StageService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Painel";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: activity-edit.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.activity = new Activity('', 0, '', '', '', '', new Date(), new Date(), false, null, [], new Date(), new Date());
    this.activity.stage = new Stage('', 0, '', '', '', null, [], new Date(), new Date());
    this.loadPage();
    //Adicionado altura da tela apenas para forçar a criação da barra de rolagem, rever css
    this.alturaTela =
      window.innerHeight > 0 ? window.innerHeight : screen.height;
  }

  loadPage() {
    this._stageService
      .getStages()
      .subscribe(
        (response) => {
          if (response) {
            this.stages = response.stages;
            this._route.params.subscribe((params) => {
              this.activityId = params["id"];
              this.getActivity(this.activityId);
            });
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getActivity(id) {
    this._activityService.getActivity(id).subscribe(
      (response) => {
        if (response.activity) {
          let activity = response.activity;
          activity.start_time = new Date(activity.start_time);
          activity.end_time = new Date(activity.end_time);
          this.activity =activity;
          if(this.activity.contents){
            this.getContents();
          }else{
            this._spinner.hide();
            this.activity.contents = [];
          }
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/editactivity", this.activityId]);
      }
    );
  }

  getContents() {
    this.activity.contents.forEach((content, index) => {
      this._contentService.getContent(content._id).subscribe((response) => {
        this.activity.contents[index] = response.content;
        this._spinner.hide();
        if (this.activity.contents[index].file) {
          let idFile = this.activity.contents[index].file;
          this.getDocuments(this.activity.contents[index], idFile);
        }
      });
    });
  }

  getDocuments(content: Content, idFile: any) {
    this._documentService.getDocument(idFile).subscribe(
      (response) => {
        content.file = response.document;
      },
      (error) => {
        content.file = null;
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
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
        //Uploads anteriores retornam Documents como resposta
        if (response.document) {
          this.activity.contents[index].file = response.document;
          this.activity.contents[index].fileToUpload = null;
          index += 1;
        }

        //Novos uploads retornam HttpEventType como resposta
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
        this.activity.contents[index] = content.content;
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

  saveActivity() {
    this._activityService.updateActivity(this.activity).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.lecture) {
          this.status = "error";
        } else {
          this.status = "success";
          this.getActivity(this.activityId);
        }
      },
      (error) => {
        this._spinner.hide();
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }
}
