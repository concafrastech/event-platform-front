import { ContentService } from "./../../../services/content.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Epic } from "src/app/models/epic";
import { Lecture } from "src/app/models/lecture";
import { EpicService } from "src/app/services/epic.service";
import { LectureService } from "src/app/services/lecture.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { HttpEventType } from "@angular/common/http";
import { DocumentService } from "src/app/services/document.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Document } from "src/app/models/document";

@Component({
  selector: "app-lecture-add",
  templateUrl: "./lecture-add.component.html",
  styleUrls: ["./lecture-add.component.css"],
  providers: [
    UserService,
    LectureService,
    EpicService,
    ContentService,
    DocumentService,
  ],
})
export class LectureAddComponent implements OnInit {
  public title: string;
  public lectureId: string;
  public url: string;
  public status: string;
  public lecture: Lecture;
  public identity: string;
  public epics = [];
  public alturaTela: number;
  public contentIsValid: boolean = false;
  public thumbnailToUpload: File;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _contentService: ContentService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _bsLocaleService: BsLocaleService,
    private _documentService: DocumentService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Adicionar Palestra";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: lecture-add.");
    this._spinner.show();
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
    this.saveThumbnail();
  }

  //Salva thumbnail
  saveThumbnail() {
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
        this.lecture.contents[index]._id = content.content._id;
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

  //Salva a palestra
  saveLecture() {
    this._lectureService.addLecture(this.lecture).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.lecture) {
          this.status = "error";
        } else {
          this.status = "success";
          this._router.navigate(["/admin/lecture/edit", response.lecture._id]);
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
    this.lecture.contents.forEach((content) => {
      if (content.file) {
        this._documentService.deleteDocument(content.file._id).subscribe();
      }
    });
  }

  //Apaga conteúdos
  deleteContents() {
    this.lecture.contents.forEach((content) => {
      if (content.file) {
        this._contentService.deleteContent(content._id).subscribe();
      }
    });
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
