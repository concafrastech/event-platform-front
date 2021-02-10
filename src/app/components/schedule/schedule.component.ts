import { Lecture } from "src/app/models/lecture";
import { LectureService } from "./../../services/lecture.service";
import { PalestrasComponent } from "./../../epics/main/feira/palestras/palestras.component";
import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Epic } from "src/app/models/epic";
import { Schedule } from "src/app/models/schedule";
import { EpicService } from "src/app/services/epic.service";
import { UserService } from "src/app/services/user.service";
import { Observable } from "rxjs/Observable";
import { concat } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-schedule",
  templateUrl: "./schedule.component.html",
  styleUrls: ["./schedule.component.css"],
  providers: [UserService, EpicService, LectureService],
})
export class ScheduleComponent implements OnInit {
  public epics: Epic[] = [];
  public currentEpic: Epic;
  public identity;
  public groupSchedules: any[] = [];
  public schedules: Schedule[] = [];
  public status: string;
  public closeBtnName: string;
  public title: string;
  public strMonths = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];
  public isLoading: boolean;
  // palco
  // ndc
  // palestras
  // espaço do caravaneiro

  constructor(
    private _userService: UserService,
    private _epicService: EpicService,
    private _lectureService: LectureService,
    public bsModalRef: BsModalRef,
    private cRef: ChangeDetectorRef,
    private _spinner: NgxSpinnerService
  ) {}

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this.identity = this._userService.getIdentity();

    this._epicService.getEpics().subscribe((response) => {
      this.epics = response.epics;
      this.currentEpic = epic;
      this.loadScheduleEpic();
    });
  }

  findDayGroupSchedule(group: string) {
    return this.groupSchedules.find((item, index, arr) => {
      if (item.group == group) {
        return true;
      }
    });
  }

  sortSchedules(obj1: Schedule, obj2: Schedule) {
    if (obj1.start_time < obj2.start_time) {
      return -1;
    }
    if (obj1.start_time > obj2.start_time) {
      return 1;
    }
    return 0;
  }

  changeEpic(epic: Epic) {
    this.currentEpic = epic;
    this.loadScheduleEpic();
  }

  loadScheduleEpic() {
    this._spinner.show();
    this.schedules = [];
    this.groupSchedules = [];
    this._epicService
      .getSchedules(this.currentEpic._id, this.identity._id)
      .subscribe(
        (response) => {
          if (response) {
            this.schedules = response;

            this.schedules.sort(this.sortSchedules);
            //this.loadlocation
            for (let i = 0; i < this.schedules.length; i++) {
              let day = new Date(this.schedules[i].start_time).getDate();
              let month = this.strMonths[
                new Date(this.schedules[i].start_time).getMonth()
              ];
              let dayMonth = ("00" + day).slice(-2) + " de " + month;

              if (!this.findDayGroupSchedule(dayMonth)) {
                this.groupSchedules.push({
                  group: dayMonth,
                  schedule: [this.schedules[i]],
                });
              } else {
                this.findDayGroupSchedule(dayMonth).schedule.push(
                  this.schedules[i]
                );
              }
            }

            this.loadPlaceSchedule().subscribe({
              next: (response) => {},
              error: null,
              complete: () => {
                this._spinner.hide();
              },
            });
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

  loadPlaceSchedule() {
    let obs$: Observable<any>[] = [];
    this.schedules.map((schedule: any, index) => {
      if (schedule.type == "activity" || schedule.type == "classroom") {
        schedule.place = "Ndc";
        if (schedule.type == "classroom") {
          schedule.place = "Formação de Trabalhadores Espirítas";
        }
      } else {
        obs$.push(
          this._lectureService.getLecture(schedule.id).pipe(
            map((response) => {
              if (response.lecture.type == "momento_coletivo") {
                schedule.place = "Palco";
              } else if (
                response.lecture.type == "workshop" ||
                response.lecture.type == "alegria" ||
                response.lecture.type == "alegria_music"
              ) {
                schedule.place = "Espaço do Caravaneiro";
              } else {
                schedule.place = "Palestras";
              }
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
}
