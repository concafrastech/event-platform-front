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
  public placeIcon = ['assets/concafras2021/concafronas/palco.png',
                      'assets/concafras2021/concafronas/ndc.png',
                      'assets/concafras2021/concafronas/palestras.png',
                      'assets/concafras2021/concafronas/formacao_trabalhadores.png',
                      'assets/concafras2021/concafronas/icones/mosaico.svg',
                      'assets/jovem/img/icone_ilha_vivo.png',
                      'assets/jovem/img/icone_ilha_escritor.png',
                      'assets/jovem/img/icone_ilha_caminho.png',
                      'assets/jovem/img/icone_ilha_irmas.png',
                      'assets/jovem/img/icone_ilha_som.png',
                    ];
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
    if (this.currentEpic.type != "jovem") {
      let obs$: Observable<any>[] = [];
      this.schedules.map((schedule: any, index) => {
        if (schedule.type == "activity" || schedule.type == "classroom") {
          schedule.iconIndex = 1;
          schedule.place = "Ndc";
          if (schedule.type == "classroom") {
            schedule.iconIndex = 3;
            schedule.place = "Formação de Trabalhadores Espirítas";
          }
        } else {
          obs$.push(
            this._lectureService.getLecture(schedule.id).pipe(
              map((response) => {
                if (response.lecture.type == "momento_coletivo") {
                  schedule.iconIndex = 0;
                  schedule.place = "Palco";
                } else if (
                  response.lecture.type == "workshop" ||
                  response.lecture.type == "alegria" ||
                  response.lecture.type == "alegria_music"
                ) {
                  schedule.iconIndex = 4;
                  schedule.place = "Espaço do Caravaneiro";
                } else {
                  schedule.iconIndex = 2;
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
    } else {
      // epic Jovem
      let obs$: Observable<any>[] = [];
      this.schedules.map((schedule: any, index) => {
        switch(schedule.type.toLowerCase()) {
          case "activity":
          case "ilha casa do escritor":
            schedule.iconIndex = 6;
            schedule.place = "Casa do Escritor";
            if(schedule.name.toLowerCase() == "tira dúvidas mocidade espírita") {
              schedule.iconIndex = 8;
              schedule.place = "Instituto Almas Irmãs";
            }
            break;
          case "classroom":
          case "ilha casa do caminho":
          case "ilha casa do escritor":
            let start = new Date(schedule.start_time);
            let startPratica = new Date('02/14/2021 09:30');
            if (start.getTime() < startPratica.getTime()) {
              schedule.iconIndex = 6;
              schedule.place = "Casa do Escritor";
            } else {
              schedule.iconIndex = 7;
              schedule.place = "Casa do Caminho";
            }
            break;
          default:
          obs$.push(
            this._lectureService.getLecture(schedule.id).pipe(
              map((response) => {
                switch(response.lecture.type.toLowerCase()) {
                  case "momento_coletivo":
                  case "ilha estação jovem ao vivo":
                    schedule.iconIndex = 5;
                    schedule.place = "Estação Jovem AO VIVO";
                    break;
                  case "workshop":
                  case "alegria":
                  case "alegria_music":
                  case "ilha catedral do som":
                    schedule.iconIndex = 9;
                    schedule.place = "Catedral do Som";
                    break;
                  case "ilha instituto almas irmãs":
                    schedule.iconIndex = 8;
                    schedule.place = "Instituto Almas Irmãs";
                    break;
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
      )
    }
  }
}
