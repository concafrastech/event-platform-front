import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Epic } from "src/app/models/epic";
import { Trail } from "src/app/models/trail";
import { EpicService } from "src/app/services/epic.service";
import { TrailService } from "src/app/services/trail.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ClassroomService } from "src/app/services/classroom.service";
import { Classroom } from "src/app/models/classroom";
import { concat, Observable } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { ContentService } from "src/app/services/content.service";
import { DocumentService } from "src/app/services/document.service";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-trail-edit",
  templateUrl: "./trail-edit.component.html",
  styleUrls: ["./trail-edit.component.css"],
  providers: [
    UserService,
    TrailService,
    EpicService,
    ClassroomService,
    ContentService,
    DocumentService,
  ],
})
export class TrailEditComponent implements OnInit {
  public title: string;
  public trailId: string;
  public url: string;
  public status: string;
  public trail: Trail;
  public identity: string;
  public epics = [];
  public momentOne: Classroom;
  public momentTwo: Classroom;
  public showMoments: boolean = false;

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
    this.title = "Editar Temas";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: trail-edit.");
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
    this.trail.epic = new Epic(
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
    this.showMoments = false;
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );

    this._route.params.subscribe((params) => {
      this.trailId = params["id"];
      this.getTrail(this.trailId);
    });
  }

  getTrail(id) {
    this._trailService.getTrail(id).subscribe(
      (response) => {
        if (response.trail) {
          this.trail = response.trail;
          for (let i = 0; i < this.trail.classrooms.length; i++) {
            if (this.trail.classrooms[i].type == "teorico") {
              if (!this.momentOne || this.momentOne._id == "") {
                this.momentOne = this.trail.classrooms[i];
              } else {
                this.momentTwo = this.trail.classrooms[i];
              }
            }
          }

          if (this.momentOne) {
            this.removeClassroom(this.trail.classrooms.indexOf(this.momentOne));
          }
          if (this.momentTwo) {
            this.removeClassroom(this.trail.classrooms.indexOf(this.momentTwo));
          }
          this.showMoments = true;
          this._spinner.hide();
        } else {
          this._spinner.hide();
          this.status = "error";
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
        this._router.navigate(["/edittrail", this.trailId]);
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
        "",
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
          next: (resposta) => {
          },
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
        if (content._id) {
          obs$.push(this._contentService.updateContent(content));
        } else {
          obs$.push(
            this._contentService.addContent(content).pipe(
              map((c) => {
                this.trail.classrooms[index].contents[i]._id = c.content._id;
              })
            )
          );
        }
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
      if (classroom._id) {
        obs$.push(this._classroomService.updateClassroom(classroom));
      } else {
        obs$.push(
          this._classroomService.addClassroom(classroom).pipe(
            map((c) => {
              this.trail.classrooms[index] = c.classroom;
              return this.trail.classrooms[index];
            })
          )
        );
      }
    });
    return concat(obs$).pipe(
      concatMap((observableContent) => {
        return observableContent;
      })
    );
  }

  // Salva Tema
  saveTrail() {
    this._trailService.updateTrail(this.trail).subscribe(
      (response) => {
        if (!response.trail) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this.status = "success";
          this.trail = null;
          this.momentOne = null;
          this.momentTwo = null;
          this.loadPage();
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
