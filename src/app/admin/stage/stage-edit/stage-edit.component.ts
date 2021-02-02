import { ActivityService } from "src/app/services/activity.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Stage } from "src/app/models/stage";
import { EpicService } from "src/app/services/epic.service";
import { StageService } from "src/app/services/stage.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Activity } from "src/app/models/activity";
import { HttpEventType } from "@angular/common/http";
import { Document } from "src/app/models/document";
import { DocumentService } from "src/app/services/document.service";
import { ContentService } from "src/app/services/content.service";

@Component({
  selector: "app-stage-edit",
  templateUrl: "./stage-edit.component.html",
  styleUrls: ["./stage-edit.component.css"],
  providers: [
    UserService,
    StageService,
    EpicService,
    ActivityService,
    ContentService,
    DocumentService,
  ],
})
export class StageEditComponent implements OnInit {
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
    this.title = "Editar Trilha";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: stage-edit.");
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
    this.stage.epic = null; // new Epic('', '', '', '', '', '', null, new Date(), new Date());
    this.loadPage();
  }

  loadPage() {
    this._activityService.getFullActivities().subscribe(
      (response) => {
        this._spinner.hide();
        this.activities = response.activities;
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
          this._route.params.subscribe((params) => {
            this.stageId = params["id"];
            this.getStage(this.stageId);
          });
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  getStage(id) {
    this._stageService.getStage(id).subscribe(
      (response) => {
        if (response.stage) {
          this._spinner.hide();
          this.stage = response.stage;
          this._documentService
            .getDocument(this.stage.thumbnail)
            .subscribe((response) => {
              this.stage.thumbnail = response.document;
            });
        } else {
          this._spinner.hide();
          this.status = "error";
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
        this._router.navigate(["/editstage", this.stageId]);
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
    this._stageService.updateStage(this.stage).subscribe(
      (response) => {
        if (!response.stage) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this._spinner.hide();
          this.status = "success";
          this.getStage(this.stageId);
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
