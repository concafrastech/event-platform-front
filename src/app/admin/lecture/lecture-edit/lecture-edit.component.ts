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
import { DocumentService } from "src/app/services/document.service";
import { Content } from "src/app/models/content";
import { HttpEventType } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { Document } from "src/app/models/document";

@Component({
  selector: "app-lecture-edit",
  templateUrl: "./lecture-edit.component.html",
  styleUrls: ["./lecture-edit.component.css"],
  providers: [
    UserService,
    LectureService,
    EpicService,
    ContentService,
    DocumentService,
  ],
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
  public alturaTela;
  public isLoading: boolean = true;
  public thumbnailToUpload: File;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Palestra";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    this._spinner.show();
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
      new Date(),
      null
    );
    this.lecture.epic = new Epic(
      "",
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
          let lecture = response.lecture;
          lecture.start_time = new Date(lecture.start_time);
          lecture.end_time = new Date(lecture.end_time);
          this.lecture = lecture;
          this._spinner.hide();
          this._documentService
            .getDocument(this.lecture.thumbnail)
            .subscribe((response) => {
              this.lecture.thumbnail = response.document;
            });

          if (this.lecture.contents) {
            this.getContents();
          } else {
            this._spinner.hide();
            this.lecture.contents = [];
          }
        } else {
          this.status = "error";
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
        this._router.navigate(["/editlecture", this.lectureId]);
      }
    );
  }

  getContents() {
    this.lecture.contents.forEach((content, index) => {
      this._contentService.getContent(content._id).subscribe(
        (response) => {
          this.lecture.contents[index] = response.content;
          this._spinner.hide();
          if (this.lecture.contents[index].file) {
            let idFile = this.lecture.contents[index].file;
            this.getDocuments(this.lecture.contents[index], idFile);
          }
        },
        (error) => {
          this._spinner.hide();
        }
      );
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
    this.saveThumbnail();
  }

  //Salva thumbnail
  saveThumbnail() {
    if (this.thumbnailToUpload) {
      this._contentService.uploadFile(this.thumbnailToUpload).subscribe({
        next: (response) => {
          //Final do upload
          if (response.type == HttpEventType.Response) {
            this.lecture.thumbnail = response.body.document;
          }
        },
        error: null,
        complete: () => {
          this.saveDocuments();
        },
      });
    }else{
      this.saveDocuments();
    }
  }

  //Realiza upload e salva os documentos
  saveDocuments() {
    this._contentService.uploadContents(this.lecture.contents).subscribe({
      next: (response) => {},
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
    this._contentService.saveContents(this.lecture.contents).subscribe({
      next: (content) => {
        this.lecture.contents[index] = content.content;
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
      complete: () => this.saveLecture(),
    });
  }

  saveLecture() {
    this._lectureService.updateLecture(this.lecture).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.lecture) {
          this.status = "error";
        } else {
          this.status = "success";
          this.getLecture(this.lectureId);
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
      this.lecture.thumbnail = null;
    });
  }
}
