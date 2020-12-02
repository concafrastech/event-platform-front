import { ContentService } from "src/app/services/content.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Epic } from "src/app/models/epic";
import { Lecture } from "src/app/models/lecture";
import { EpicService } from "src/app/services/epic.service";
import { LectureService } from "src/app/services/lecture.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-lecture-edit",
  templateUrl: "./lecture-edit.component.html",
  styleUrls: ["./lecture-edit.component.css"],
  providers: [UserService, LectureService, EpicService, ContentService],
})
export class LectureEditComponent implements OnInit {
  public title: string;
  public lectureId: string;
  public url: string;
  public status: string;
  public lecture: Lecture;
  public identity: string;
  public epics = [];
  public contentIsValid: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _contentService: ContentService,
    private _bsLocaleService: BsLocaleService
  ) {
    this.title = "Editar Palestra";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: lecture-edit.");
    this.identity = this._userService.getIdentity();
    this.lecture = new Lecture(
      "",
      "",
      "",
      "",
      "",
      new Date(),
      new Date(),
      null,
      [],
      new Date(),
      new Date()
    );
    this.lecture.epic = new Epic(
      "",
      "",
      "",
      "",
      "",
      null,
      new Date(),
      new Date()
    );
    this.loadPage();
  }

  loadPage() {
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
          this._route.params.subscribe((params) => {
            this.lectureId = params["id"];
            this.getLecture(this.lectureId);
          });
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getLecture(id) {
    this._lectureService.getLecture(id).subscribe(
      (response) => {
        if (response.lecture) {
          console.log(response);
          let lecture = response.lecture;
          lecture.start_time = new Date(lecture.start_time);
          lecture.end_time = new Date(lecture.end_time);
          this.lecture = lecture;
          this.getContents()
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/editlecture", this.lectureId]);
      }
    );
  }

  getContents() {
    this.lecture.contents.forEach((content) => {
      this._contentService.getContent(content._id).subscribe((response) => {
        this.lecture.contents[0] = response.content
      });
    });
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  contentFormIsValid(event: boolean) {
    return (this.contentIsValid = event);
  }

  onSubmit() {
    console.log(this.lecture);
    this._lectureService.updateLecture(this.lecture).subscribe(
      (response) => {
        if (!response.lecture) {
          this.status = "error";
        } else {
          this.status = "success";
          this.getLecture(this.lectureId);
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }
}
