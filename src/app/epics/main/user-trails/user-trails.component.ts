import { Classroom } from "./../../../models/classroom";
import { Component, OnInit } from "@angular/core";
import { Trail } from "src/app/models/trail";
import { ClassroomService } from "src/app/services/classroom.service";
import { User } from "src/app/models/user";

@Component({
  selector: "app-user-trails",
  templateUrl: "./user-trails.component.html",
  styleUrls: ["./user-trails.component.css"],
  providers: [ClassroomService],
})
export class UserTrailsComponent implements OnInit {
  public trails: Trail[];
  public status: string;
  public user: User;
  public momentOne: Classroom;
  public momentTwo: Classroom;
  public practical: Classroom;

  constructor(private _classroomService: ClassroomService) {}

  ngOnInit(): void {
    var subscription = JSON.parse(localStorage.getItem("currentSubscription"));
    this.user = subscription.user;
    if (subscription) {
      this.trails = subscription.trails;
    }

    this.trails.forEach((trail, index) => {
      this.getClassrooms(trail, index);
    });
  }

  getClassrooms(trail, ind) {
    if (trail.classrooms) {
      trail.classrooms.forEach((classroom, index) => {
        this._classroomService.getClassroom(classroom).subscribe(
          (response) => {
            let classroomaux = response.classroom;
            classroomaux.start_time = new Date(classroomaux.start_time);
            classroomaux.end_time = new Date(classroomaux.end_time);
            trail.classrooms[index] = classroomaux;
          },
          (error) => {
            var errorMessage = <any>error;
            console.log(errorMessage);

            if (errorMessage != null) {
              this.status = "error";
            }
          }
        );
      });
      this.trails[ind] = trail;
    }
  }

  splitClassrooms(trail: Trail) {
    this.practical = null;
    this.momentOne = null;
    this.momentTwo = null;

    if (trail) {
      //Busca momentos teóricos da trail
      for (let i = 0; i < trail.classrooms.length; i++) {
        if (trail.classrooms[i].type == "teorico") {
          if (!this.momentOne || this.momentOne._id == "") {
            this.momentOne = trail.classrooms[i];
          } else {
            this.momentTwo = trail.classrooms[i];
          }
        } else {
        }
      }

      let defaultPratical: Classroom;
      let userPratical: Classroom;

      //Curso geral
      defaultPratical = trail.classrooms.find((classroom, index) => {
        if (
          classroom.tags == null ||
          !classroom.tags ||
          classroom.tags.length == 0
        ) {
          return true;
        }
      });

      //Curso usuário
      userPratical = trail.classrooms.find((classroom, index) => {
        if (classroom.tags && classroom.tags.length > 0) {
          let tagUser = classroom.tags.find((tag, i) => {
            if (tag.toUpperCase() == this.user.state.toUpperCase()) {
              return true;
            }
          });

          if (tagUser) {
            return true;
          }
        }
      });

      //Se existir curso prático para a região do usuário retorna, senão retorna geral
      this.practical = userPratical ? userPratical : defaultPratical;
    }
  }
}
