import { EfasComponent } from './../efas/efas.component';
import { ActivityService } from "./../../../services/activity.service";
import { LectureService } from "./../../../services/lecture.service";
import { Activity } from "./../../../models/activity";
import { Component, OnInit } from "@angular/core";
import { Schedule } from "src/app/models/schedule";
import { ShareMessage } from "src/app/models/share-message";
import { EpicService } from "src/app/services/epic.service";
import { ShareMessageService } from "src/app/services/share-message.service";
import { UserService } from "src/app/services/user.service";
import { Lecture } from "src/app/models/lecture";
import { DocumentService } from "src/app/services/document.service";
import { Router } from "@angular/router";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { YoutubeLiveService } from 'src/app/services/youtubelive.service';

@Component({
  selector: "app-right-sidebar",
  templateUrl: "./right-sidebar.component.html",
  styleUrls: ["./right-sidebar.component.css"],
  providers: [
    UserService,
    ShareMessageService,
    EpicService,
    LectureService,
    ActivityService,
    DocumentService,
    YoutubeLiveService,
  ],
})
export class RightSidebarComponent implements OnInit {
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _epicService: EpicService,
    private _lectureService: LectureService,
    private _activityService: ActivityService,
    private _shareMessageService: ShareMessageService,
    private _documentService: DocumentService,
    private _modalService: BsModalService,
    private _youtubeLiveService:YoutubeLiveService
  ) {}

  public bsModalRef: BsModalRef;

  public messages: ShareMessage[] = [];
  public currentCarouselShareMessage: number = 0;
  public sizeCarouselShareMessage: number = 0;

  public schedules: Schedule[] = [];
  public todaySchedule: Schedule[] = [];
  public currentCarouselSchedule: number = 0;
  public sizeCarouselSchedule: number = 0;
  public currentItem: Lecture | Activity;
  public now: boolean;
  public strTime: string;

  public youtubeliveid: string;
  
  ngOnInit(): void {
    this.loadCarouselSchedule();
    this.loadCarouselShareMessage();
    this._youtubeLiveService.youtubelive.subscribe((data) => {
      this.youtubeliveid = data;
    });
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
          this.loadThumbnail();
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
    this.loadThumbnail();
  }

  nextCarouselSchedule() {
    if (this.currentCarouselSchedule == this.sizeCarouselSchedule - 1) {
      this.currentCarouselSchedule = 0;
    } else {
      this.currentCarouselSchedule += 1;
    }
    this.loadThumbnail();
  }

  createTodaySchedule(schedule: Schedule) {
    let today = new Date();
    let startDay = new Date(schedule.start_time);
    let todayTime = today.getTime();
    let startTime = startDay.getTime();
    let endTime = new Date(schedule.end_time).getTime();

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
          today.getMinutes() <= startDay.getMinutes()) ||
        (todayTime >= startTime && todayTime <= endTime)
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

  formatScheduleStartHour(schedule: Schedule) {
    let messageTime = "";
    let isNow = false;

    if (schedule) {
      let today = new Date();

      //15 minutos em milisegundos
      let milis15 = 15 * 60 * 1000;
      let start = new Date(schedule.start_time);

      let remainingTime = start.getTime() - today.getTime();

      if (remainingTime < milis15 && remainingTime > 0) {
        remainingTime = remainingTime / 1000;
        let minute = Math.trunc(remainingTime / 60);
        messageTime = `Começa em ${minute} minutos`;
      } else {
        if (remainingTime < 0) {
          isNow = true;
          messageTime = "Acontecendo agora";
        } else {
          messageTime =
            "Hoje às " +
            ("00" + start.getHours()).slice(-2) +
            ":" +
            ("00" + start.getMinutes()).slice(-2);
        }
      }
    } else {
      messageTime = "";
    }

    this.now = isNow;
    this.strTime = messageTime;
  }

  loadThumbnail() {
    if (this.todaySchedule && this.todaySchedule.length > 0) {
      let id = this.todaySchedule[this.currentCarouselSchedule].id;
      this.currentItem = null;

      this.formatScheduleStartHour(
        this.todaySchedule[this.currentCarouselSchedule]
      );

      if (this.todaySchedule[this.currentCarouselSchedule].type == "lecture") {
        this._lectureService.getLecture(id).subscribe((response) => {
          this.currentItem = response.lecture;
          this._documentService
            .getDocument(this.currentItem.thumbnail)
            .subscribe((response) => {
              this.currentItem.thumbnail = response.document;
            });
        });
      } else {
        if (
          this.todaySchedule[this.currentCarouselSchedule].type == "activity"
        ) {
          this._activityService.getActivity(id).subscribe((response) => {
            this.currentItem = response.activity;
            this._documentService
              .getDocument(this.currentItem.thumbnail)
              .subscribe((response) => {
                this.currentItem.thumbnail = response.document;
              });
          });
        }
      }
    }
  }

  goToAudithorium() {
    if (this.now) {
      this._router.navigate([
        "/audithorium",
        this.todaySchedule[this.currentCarouselSchedule].type,
        this.todaySchedule[this.currentCarouselSchedule].id,
      ]);
    }
  }

  openEFASComponent() {
    const initialState = {
      title: "Encontro Fraterno Auta de Souza",
    };
    this.bsModalRef = this._modalService.show(EfasComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }
}
