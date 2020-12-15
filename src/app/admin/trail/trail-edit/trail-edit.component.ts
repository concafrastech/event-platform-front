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

@Component({
  selector: "app-trail-edit",
  templateUrl: "./trail-edit.component.html",
  styleUrls: ["./trail-edit.component.css"],
  providers: [UserService, TrailService, EpicService, ClassroomService],
})
export class TrailEditComponent implements OnInit {
  public title: string;
  public trailId: string;
  public url: string;
  public status: string;
  public trail: Trail;
  public identity: string;
  public theoreticalClassrooms: Classroom[] = [];
  public practicalClassrooms: Classroom[] = [];
  public theoreticalClassroom1: Classroom = null;
  public theoreticalClassroom2: Classroom = null;
  public epics = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trailService: TrailService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _classroomService: ClassroomService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Temas";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: trail-edit.");
    
    this.identity = this._userService.getIdentity();
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
    this._spinner.show();
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
          this.getClassrooms();
        }
      },
      (error) => {
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

          this._route.params.subscribe((params) => {
            this.trailId = params["id"];
            this.getTrail(this.trailId);
          });
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  getTrail(id) {
    this._trailService.getTrail(id).subscribe(
      (response) => {
        if (response.trail) {
          this.trail = response.trail;
          for (let i = 0; i < this.trail.classrooms.length; i++) {
            if (this.trail.classrooms[i].type == "teorico") {
              if (!this.theoreticalClassroom1) {
                this.theoreticalClassroom1 = this.trail.classrooms[i];
              } else {
                this.theoreticalClassroom2 = this.trail.classrooms[i];
              }
            }
          }

          if(this.theoreticalClassroom1){
            this.removeClassroom(this.trail.classrooms.indexOf(this.theoreticalClassroom1));
          }
          if(this.theoreticalClassroom2){
            this.removeClassroom(this.trail.classrooms.indexOf(this.theoreticalClassroom2));
          }
          
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
    this.trail.classrooms.push(null);
  }

  removeClassroom(index: number) {
    this.trail.classrooms.splice(index, 1);
  }

  onSubmit() {
    if (this.theoreticalClassroom1 !== null) {
      this.trail.classrooms.push(this.theoreticalClassroom1);
    }
    if (this.theoreticalClassroom2 !== null) {
      this.trail.classrooms.push(this.theoreticalClassroom2);
    }

    this._spinner.show();
    this._trailService.updateTrail(this.trail).subscribe(
      (response) => {
        if (!response.trail) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this._spinner.hide();
          this.status = "success";
          this.loadPage();
          this.getTrail(this.trailId);
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
