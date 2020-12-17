import { DocumentService } from "./../../../services/document.service";
import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Trail } from "src/app/models/trail";
import { Classroom } from "src/app/models/classroom";
import { TrailService } from "src/app/services/trail.service";
import { ClassroomService } from "src/app/services/classroom.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { ContentService } from "src/app/services/content.service";
import { HttpEventType } from "@angular/common/http";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-classroom-add",
  templateUrl: "./classroom-add.component.html",
  styleUrls: ["./classroom-add.component.css"],
  providers: [
    UserService,
    ClassroomService,
    TrailService,
    ContentService,
    DocumentService,
  ],
})
export class ClassroomAddComponent implements OnInit {
  public title: string;
  public classroomId: string;
  public url: string;
  public status: string;
  @Input() public classroom: Classroom;
  public identity: string;
  public trails = [];
  public contentIsValid: boolean = false;
  public isLoading: boolean = true;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _classroomService: ClassroomService,
    private _userService: UserService,
    private _trailService: TrailService,
    private _contentService: ContentService,
    private _bsLocaleService: BsLocaleService,
    private _documentService: DocumentService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Adicionar momento";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: classroom-add.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    if(!this.classroom) {
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
        [],
        new Date(),
        new Date()
      );
    }
    this.loadPage();
  }

  loadPage() {
    this._trailService.getTrails().subscribe(
      (response) => {
        if (response) {
          this.trails = response.trails;
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
    this._contentService.uploadContents(this.classroom.contents).subscribe({
      next: (response) => {
        //Final do upload
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

  //Salva os conteúdos
  saveContents() {
    let index = 0;
    this._contentService.saveContents(this.classroom.contents).subscribe({
      next: (content) => {
        this.classroom.contents[index]._id = content.content._id;
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
    this._classroomService.addClassroom(this.classroom).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.classroom) {
          this.status = "error";
        } else {
          this.status = "success";
          this._router.navigate([
            "/admin/classroom/edit",
            response.classroom._id,
          ]);
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
    this.classroom.contents.forEach((content) => {
      if (content.file) {
        this._documentService.deleteDocument(content.file._id).subscribe();
      }
    });
  }

  //Apaga conteúdos
  deleteContents() {
    this.classroom.contents.forEach((content) => {
      if (content.file) {
        this._contentService.deleteContent(content._id).subscribe();
      }
    });
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
