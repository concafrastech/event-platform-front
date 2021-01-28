import { ContentService } from "src/app/services/content.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Stage } from "src/app/models/stage";
import { EpicService } from "src/app/services/epic.service";
import { StageService } from "src/app/services/stage.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivityService } from "src/app/services/activity.service";
import { Activity } from "src/app/models/activity";
import { Document } from "src/app/models/document";
import { DocumentService } from "src/app/services/document.service";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-stage-add",
  templateUrl: "./stage-add.component.html",
  styleUrls: ["./stage-add.component.css"],
  providers: [
    UserService,
    StageService,
    EpicService,
    ActivityService,
    ContentService,
    DocumentService,
  ],
})
export class StageAddComponent implements OnInit {
  public title: string;
  public stageId: string;
  public url: string;
  public status: string;
  public stage: Stage;
  public identity: string;
  public epics = [];
  public activities: Activity[] = [];
  public thumbnailToUpload: File;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _stageService: StageService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _activityService: ActivityService,
    private _bsLocaleService: BsLocaleService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Adicionar Trilha";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: stage-add.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.stage = new Stage(
      "",
      0,
      "",
      "",
      "",
      null,
      [],
      new Date(),
      new Date(),
      null
    );
    this.stage.activities = [];
    this.stage.epic = null; /*new Epic(
      "",
      "",
      "",
      "",
      "",
      "",
      null,
      new Date(),
      new Date()
    );*/
    this.loadPage();
  }

  loadPage() {
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this._spinner.hide();
          this.epics = response.epics;
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );

    this._activityService.getActivities().subscribe(
      (response) => {
        this._spinner.hide();
        this.activities = response.activities;
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  trackByFn(index, item) {
    return index;
  }

  addActivity() {
    this.stage.activities.push(null);
  }

  removeActivity(index: number) {
    this.stage.activities.splice(index, 1);
  }

  onSubmit() {
    this._spinner.show();
    this.saveThumbnail();
  }

  //Salva thumbnail
  saveThumbnail() {
    if (this.thumbnailToUpload) {
      this._contentService.uploadFile(this.thumbnailToUpload).subscribe({
        next: (response) => {
          //Final do upload
          if (response.type == HttpEventType.Response) {
            this.stage.thumbnail = response.body.document;
          }
        },
        error: null,
        complete: () => {
          this.saveStage();
        },
      });
    } else {
      this.saveStage();
    }
  }

  saveStage() {
    this._stageService.addStage(this.stage).subscribe(
      (response) => {
        if (!response.stage) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this._spinner.hide();
          this.status = "success";
          this._router.navigate(["/admin/stage/edit", response.stage._id]);
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

  onSelectFile(fileInput: any) {
    this.thumbnailToUpload = <File>fileInput.target.files[0];
  }

  onRemoveFile(doc: Document) {
    this._spinner.show();
    this._documentService.deleteDocument(doc._id).subscribe((response) => {
      this._spinner.hide();
      this.stage.thumbnail = null;
    });
  }
}
