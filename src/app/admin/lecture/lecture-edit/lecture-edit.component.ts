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

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
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

    //Adicionado altura da tela apenas para forçar a criação da barra de rolagem, rever css
    this.alturaTela =
      window.innerHeight > 0 ? window.innerHeight : screen.height;
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
          if (this.lecture.contents) {
            this.getContents();
          } else {
            this.lecture.contents = [];
          }
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
    this.lecture.contents.forEach((content, index) => {
      this._contentService.getContent(content._id).subscribe((response) => {
        this.lecture.contents[index] = response.content;
        if (this.lecture.contents[index].file) {
          let idFile = this.lecture.contents[index].file;
          this.getDocuments(this.lecture.contents[index], idFile);
        }
      });
    });
  }

  getDocuments(content: Content, idFile: any) {
    this._documentService.getDocument(idFile).subscribe((response) => {
      content.file = response.document;
      console.log(this.lecture);
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
    this.saveDocuments();
  }

  //Realiza upload e salva os documentos
  saveDocuments() {
    let index = 0;
    this._contentService.uploadContents(this.lecture.contents).subscribe({
      next: (response) => {
        //Final do upload
        if (response.type == HttpEventType.Response) {
          this.lecture.contents[index].file = response.body.document;
          this.lecture.contents[index].fileToUpload = null;
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
