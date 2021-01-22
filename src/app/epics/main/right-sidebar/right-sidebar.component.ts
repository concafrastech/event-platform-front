import { Component, OnInit } from "@angular/core";
import { Schedule } from "src/app/models/schedule";
import { ShareMessage } from "src/app/models/share-message";
import { EpicService } from "src/app/services/epic.service";
import { ShareMessageService } from "src/app/services/share-message.service";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-right-sidebar",
  templateUrl: "./right-sidebar.component.html",
  styleUrls: ["./right-sidebar.component.css"],
  providers: [UserService, ShareMessageService, EpicService],
})
export class RightSidebarComponent implements OnInit {
  constructor(
    private _userService: UserService,
    private _epicService: EpicService,
    private _shareMessageService: ShareMessageService
  ) {}

  public messages: ShareMessage[] = [];
  public currentCarouselShareMessage: number = 0;
  public sizeCarouselShareMessage: number = 0;

  public schedules: Schedule[] = [];
  public todaySchedule: Schedule[] = [];
  public currentCarouselSchedule: number = 0;
  public sizeCarouselSchedule: number = 0;

  ngOnInit(): void {
    this.loadCarouselSchedule();
    this.loadCarouselShareMessage();
  }

  loadCarouselSchedule() {
    this.todaySchedule = [];
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    let identity = this._userService.getIdentity();

    this._epicService.getSchedules(epic._id, identity._id).subscribe(
      (response) => {
        if (response) {
          this.schedules = response;
          this.schedules.sort(this.sortSchedules);

          //Monta agenda do dia
          for (let i = 0; i < this.schedules.length; i++) {
            this.createTodaySchedule(this.schedules[i]);
          }

          this.currentCarouselSchedule = 0;
          this.sizeCarouselSchedule = this.todaySchedule.length;
        }
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);
      }
    );
  }

  loadCarouselShareMessage() {
    this.messages = [];
    this._shareMessageService
      .getRecentShareMessages(1)
      .subscribe((resposta) => {
        this.messages = resposta.shareMessages;
        this.currentCarouselShareMessage = 0;
        this.sizeCarouselShareMessage = this.messages.length;
      });
  }

  previousCarouselShareMessage() {
    if (this.currentCarouselShareMessage > 0) {
      this.currentCarouselShareMessage -= 1;
    } else {
      this.currentCarouselShareMessage = this.sizeCarouselShareMessage - 1;
    }
  }

  nextCarouselShareMessage() {
    if (this.currentCarouselShareMessage == this.sizeCarouselShareMessage - 1) {
      this.currentCarouselShareMessage = 0;
    } else {
      this.currentCarouselShareMessage += 1;
    }
  }

  previousCarouselSchedule() {
    if (this.currentCarouselSchedule > 0) {
      this.currentCarouselSchedule -= 1;
    } else {
      this.currentCarouselSchedule = this.sizeCarouselSchedule - 1;
    }
  }

  nextCarouselSchedule() {
    if (this.currentCarouselSchedule == this.sizeCarouselSchedule - 1) {
      this.currentCarouselSchedule = 0;
    } else {
      this.currentCarouselSchedule += 1;
    }
  }

  createTodaySchedule(schedule: Schedule) {
    let today = new Date();
    let startDay = new Date(schedule.start_time);

    //Verifica se está agendado para hoje
    if (
      today.getDate() == startDay.getDate() &&
      today.getMonth() == startDay.getMonth() &&
      today.getFullYear() == startDay.getFullYear()
    ) {
      //Verifica se o horário ainda não passou
      if (
        today.getHours() < startDay.getHours() ||
        (today.getHours() == startDay.getHours() &&
          today.getMinutes() <= startDay.getMinutes())
      ) {
        this.todaySchedule.push(schedule);
      }
    }
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

  formatScheduleStartHour(schedule: Schedule){
	return ("00" + schedule.start_time.getHours()).slice(-2) + ':' + ("00" + schedule.start_time.getMinutes()).slice(-2);
  }
}
