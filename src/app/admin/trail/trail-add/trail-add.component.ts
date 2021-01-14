import { Observable } from "rxjs/Observable";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Trail } from "src/app/models/trail";
import { EpicService } from "src/app/services/epic.service";
import { TrailService } from "src/app/services/trail.service";
import { ClassroomService } from "./../../../services/classroom.service";
import { Classroom } from "./../../../models/classroom";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ContentService } from "src/app/services/content.service";
import { DocumentService } from "src/app/services/document.service";
import { Content } from "src/app/models/content";
import { concat } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-trail-add",
  templateUrl: "./trail-add.component.html",
  styleUrls: ["./trail-add.component.css"],
  providers: [
    UserService,
    TrailService,
    EpicService,
    ClassroomService,
    ContentService,
    DocumentService,
  ],
})
export class TrailAddComponent implements OnInit {
  public title: string;
  public trailId: string;
  public url: string;
  public status: string;
  public trail: Trail;
  public identity: string;
  public epics = [];
  public theoreticalClassrooms: Classroom[] = [];
  public practicalClassrooms: Classroom[] = [];
  public momentOne: Classroom;
  public momentTwo: Classroom;
  public contentOne: Content[];
  public contentTwo: Content[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trailService: TrailService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _classroomService: ClassroomService,
    private _contentService: ContentService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Adicionar Temas";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: trail-add.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.momentOne = new Classroom(
      "",
      "",
      "",
      "teorico",
      new Date(),
      new Date(),
      "",
      null,
      [],
      [],
      new Date(),
      new Date()
    );
    this.momentTwo = new Classroom(
      "",
      "",
      "",
      "teorico",
      new Date(),
      new Date(),
      "",
      null,
      [],
      [],
      new Date(),
      new Date()
    );
    this.trail = new Trail(
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
    this.trail.epic = null;
    this.loadPage();
  }

  loadPage() {
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
          this.getClassrooms();
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  getClassrooms() {
    this.theoreticalClassrooms = [];
    this.practicalClassrooms = [];
    //Lê todos os classrooms e separa por tipo, classrooms sem tipo não aparecem.
    //Atualizar após get classroom por tipo.
    this._classroomService.getClassrooms().subscribe(
      (response) => {
        if (response) {
          let classrooms: Classroom[] = response.classrooms;

          for (let i = 0; i < classrooms.length; i++) {
            if (classrooms[i].type == "teorico") {
              this.theoreticalClassrooms.push(classrooms[i]);
            }
            if (classrooms[i].type == "pratico") {
              this.practicalClassrooms.push(classrooms[i]);
            }
          }

          this._spinner.hide();
        }
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

  addClassroom() {
    this.trail.classrooms.push(
      new Classroom(
        "",
        "",
        "",
        "pratico",
        new Date(),
        new Date(),
        "",
        null,
        [],
        [],
        new Date(),
        new Date()
      )
    );
  }

  removeClassroom(index: number) {
    this.trail.classrooms.splice(index, 1);
  }

  onSubmit() {
    // Vincula momentos com o tema
    if (this.momentOne) {
      this.trail.classrooms.push(this.momentOne);
    }
    if (this.momentTwo) {
      this.trail.classrooms.push(this.momentTwo);
    }

    // Habilita o spinner
    this._spinner.show();

    this.saveDocuments().subscribe({
      next: (resposta) => {},
      error: null,
      complete: () => {
        this.saveContents().subscribe({
          next: (resposta) => {},
          error: null,
          complete: () => {
            this.saveClassrooms().subscribe({
              next: (resposta) => {},
              error: null,
              complete: () => {
                this.saveTrail();
              },
            });
          },
        });
      },
    });
  }

  //Salva documentos
  saveDocuments() {
    let obs$: Observable<any>[] = [];

    this.trail.classrooms.map((classroom, index) => {
      let i = 0;
      obs$.push(
        this._contentService.uploadContents(classroom.contents).pipe(
          map((response) => {
            //Final do upload
            if (response.type == HttpEventType.Response) {
              this.trail.classrooms[index].contents[i].file =
                response.body.document;
              this.trail.classrooms[index].contents[i].fileToUpload = null;
              i += 1;
            }
          })
        )
      );
    });
    return concat(obs$).pipe(
      concatMap((observableContent) => {
        return observableContent;
      })
    );
  }

  //Salva contents
  saveContents() {
    let obs$: Observable<any>[] = [];

    this.trail.classrooms.map((classroom, index) => {
      classroom.contents.map((content, i) => {
        obs$.push(
          this._contentService.addContent(content).pipe(
            map((c) => {
              this.trail.classrooms[index].contents[i]._id = c.content._id;
            })
          )
        );
      });
    });
    return concat(obs$).pipe(
      concatMap((observableContent) => {
        return observableContent;
      })
    );
  }

  // Salva Classrooms
  saveClassrooms() {
    let obs$: Observable<any>[] = [];

    this.trail.classrooms.map((classroom, index) => {
      obs$.push(
        this._classroomService.addClassroom(classroom).pipe(
          map((c) => {
            this.trail.classrooms[index] = c.classroom;
            return this.trail.classrooms[index];
          })
        )
      );
    });
    return concat(obs$).pipe(
      concatMap((observableContent) => {
        return observableContent;
      })
    );
  }

  // Salva Tema
  saveTrail() {
    this._trailService.addTrail(this.trail).subscribe(
      (response) => {
        if (!response.trail) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this._spinner.hide();
          this.status = "success";
          this._router.navigate(["/admin/trail/edit", response.trail._id]);
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
