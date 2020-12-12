import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Trail } from "src/app/models/trail";
import { Classroom } from "src/app/models/classroom";
import { TrailService } from "src/app/services/trail.service";
import { ClassroomService } from "src/app/services/classroom.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { ContentService } from "src/app/services/content.service";
import { DocumentService } from "src/app/services/document.service";
import { Content } from "src/app/models/content";
import { HttpEventType } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";
import { event } from "jquery";

@Component({
  selector: "app-classroom-edit",
  templateUrl: "./classroom-edit.component.html",
  styleUrls: ["./classroom-edit.component.css"],
  providers: [
    UserService,
    ClassroomService,
    TrailService,
    ContentService,
    DocumentService,
  ],
})
export class ClassroomEditComponent implements OnInit {
  public title: string;
  public classroomId: string;
  public url: string;
  public status: string;
  public classroom: Classroom;
  public identity: string;
  public trails = [];
  public isLoading: boolean = true;
  public contentIsValid: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _classroomService: ClassroomService,
    private _userService: UserService,
    private _trailService: TrailService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Curso";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: classroom-edit.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.classroom = new Classroom(
      "",
      "",
      "",
      "",
      new Date(),
      new Date(),
      "",
      null,
      [],
      [],
      new Date(),
      new Date()
    );
    this.classroom.trail = new Trail(
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
    this._trailService.getTrails().subscribe(
      (response) => {
        if (response) {
          this.trails = response.trails;
          this._route.params.subscribe((params) => {
            this.classroomId = params["id"];
            this.getClassroom(this.classroomId);
          });
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  getClassroom(id) {
    this._classroomService.getClassroom(id).subscribe(
      (response) => {
        if (response.classroom) {
          let classroom = response.classroom;
          classroom.start_time = new Date(classroom.start_time);
          classroom.end_time = new Date(classroom.end_time);
          this.classroom = classroom;
          if (this.classroom.contents) {
            this.getContents();
          } else {
            this._spinner.hide();
            this.classroom.contents = [];
          }
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/editclassroom", this.classroomId]);
      }
    );
  }

  getContents() {
    this.classroom.contents.forEach((content, index) => {
      this._contentService.getContent(content._id).subscribe((response) => {
        this.classroom.contents[index] = response.content;
        this._spinner.hide();
        if (this.classroom.contents[index].file) {
          let idFile = this.classroom.contents[index].file;
          this.getDocuments(this.classroom.contents[index], idFile);
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

  onSubmit() {
    this._spinner.show();
    this.saveDocuments();
  }

  //Realiza upload e salva os documentos
  saveDocuments() {
    let index = 0;
    this._contentService.uploadContents(this.classroom.contents).subscribe({
      next: (response) => {
        //Uploads anteriores retornam Documents como resposta
        if (response.document) {
          this.classroom.contents[index].file = response.document;
          this.classroom.contents[index].fileToUpload = null;
          index += 1;
        }

        //Novos uploads retornam HttpEventType como resposta
        if (response.type == HttpEventType.Response) {
          this.classroom.contents[index].file = response.body.document;
          this.classroom.contents[index].fileToUpload = null;
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

  contentFormIsValid(event: boolean) {
    return (this.contentIsValid = event);
  }

  //Salva os conteúdos
  saveContents() {
    let index = 0;
    this._contentService.saveContents(this.classroom.contents).subscribe({
      next: (content) => {
        this.classroom.contents[index] = content.content;
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
      complete: () => this.saveClassroom(),
    });
  }

  saveClassroom() {
    this._classroomService.updateClassroom(this.classroom).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.classroom) {
          this.status = "error";
        } else {
          this.status = "success";
          this.getClassroom(this.classroomId);
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

  public addTag(evento) {
    if (evento.key == "Enter") {
      if (evento.target.value != "") {
        this.classroom.tags.push(evento.target.value);
        evento.target.value = "";
      }
      
      //Impede do angular enviar o form no enter
      evento.preventDefault();
    }
  }

  public removeTag(tag) {
    let index = this.classroom.tags.indexOf(tag);
    this.classroom.tags.splice(index, 1);
  }
}
