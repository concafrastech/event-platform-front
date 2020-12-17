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

@Component({
  selector: "app-trail-add",
  templateUrl: "./trail-add.component.html",
  styleUrls: ["./trail-add.component.css"],
  providers: [UserService, TrailService, EpicService, ClassroomService],
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
    this.momentTwo = new Classroom(
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
    /*new Epic(
      "",
      "",
      "",
      "",
      "",
      "",
      null,
      new Date(),
      new Date()
    );*/
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
    this.trail.classrooms.push(null);
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

    // Chama a inserção
    this.saveClassroom();
  }

  saveClassroom() {
    let index = 0;
    this._classroomService.saveclassrooms(this.trail.classrooms).subscribe({
      next: (response) => {
        this.trail.classrooms[index] = response.classroom;
        index =+ 1;
      },
      error: (error) => {
        this._spinner.hide();
        var errorMessage = <any>error;
        console.log(errorMessage);
        if (errorMessage != null) {
          this.status = "error";
        }
      },
      complete: () => this.saveTrail()
    })
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
