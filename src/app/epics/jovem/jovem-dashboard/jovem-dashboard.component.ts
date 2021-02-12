  import { DocumentService } from "src/app/services/document.service";
  import { MagneticPassDistanceComponent } from 'src/app/epics/main/magnetic-pass-distance/magnetic-pass-distance.component';
  import { Component, OnInit, AfterViewInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { GamificationService } from 'angular-gamification';
  import { NgBootstrapAlert, NgBootstrapAlertService } from 'ng-bootstrap-alert';
  import { UserService } from 'src/app/services/user.service';
  import { 
    faHeart,
    faLifeRing,
    faQuestionCircle,
    faUserCircle
  } from '@fortawesome/free-regular-svg-icons';
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
  import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
  import { FraternalSupportComponent } from "src/app/epics/main/fraternal-support/fraternal-support.component";
  import { TawkService } from "src/app/services/tawk-service";
  import { Location } from '@angular/common';
  import { NavbarService } from "src/app/services/navbar.service";
  import { JovemRightSidebarComponent } from "src/app/epics/jovem/jovem-right-sidebar/jovem-right-sidebar.component";

  import { EfasComponent } from "src/app/epics/main/efas/efas.component";
  import { ActivityService } from "src/app/services/activity.service";
  import { LectureService } from "src/app/services/lecture.service";
  import { Activity } from "src/app/models/activity";
  import { Schedule } from "src/app/models/schedule";
  import { ShareMessage } from "src/app/models/share-message";
  import { EpicService } from "src/app/services/epic.service";
  import { ShareMessageService } from "src/app/services/share-message.service";
  import { Lecture } from "src/app/models/lecture";
  import { YoutubeLiveService } from 'src/app/services/youtubelive.service';
  import { UserGamificationService } from 'src/app/services/user-gamification.service';

  @Component({
    selector: 'app-jovem-dashboard',
    templateUrl: './jovem-dashboard.component.html',
    styleUrls: ['./jovem-dashboard.component.css'],
    providers: [
      TawkService,
      NavbarService,
      UserService,
      ShareMessageService,
      EpicService,
      LectureService,
      ActivityService,
      DocumentService]
  })
  export class JovemDashboardComponent implements OnInit, AfterViewInit {
  
    public identity;
    public user;
    public progress;
    public bsModalRef: BsModalRef;
    public showChat: boolean = false;
  
    public faUserCircle = faUserCircle;
    public userName: String;
    public showBack: Boolean = true;

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
    public sourceUrl: string;
  
    constructor(
      private _router: Router,
      private _userService: UserService,
      public _bootstrapAlertService: NgBootstrapAlertService,
      private location: Location,
      public _navbarService: NavbarService,
      private _epicService: EpicService,
      private _lectureService: LectureService,
      private _activityService: ActivityService,
      private _shareMessageService: ShareMessageService,
      private _documentService: DocumentService,
      private _modalService: BsModalService,
      private _youtubeLiveService:YoutubeLiveService,
      public _userGamificationService: UserGamificationService
    ) { 

      this.progress = {
        max: 0,
        value: 0,
      };
      this.user = this._userService.getIdentity();
      this.initGamefication();
 
    }
  
    ngOnInit(): void {
      this.identity = this._userService.getIdentity();
      if(!this.identity.nick) {
        this.userName = this.identity.name;
      } else {
        this.userName = this.identity.nick;
      }
      this._documentService
      .getDocument(this.user.image)
      .subscribe((response) => {
        this.user.image = response.document;
      });
      //this._navbarService.setButtonBack(false);
      this.loadCarouselSchedule();
      this.loadCarouselShareMessage();
      this._youtubeLiveService.youtubelive.subscribe((data) => {
      console.log("Recebi:");
      console.log(data);
      this.youtubeliveid = data;
      this.sourceUrl = "https://www.youtube.com/live_chat?v="+ this.youtubeliveid + "&embed_domain=event-platform-concafras.web.app";
    });
    }

    ngAfterViewInit() {
      //this.showBack = this._navbarService.ButtonBackIsVisible();
    }
  
    logout() {
      localStorage.clear();
      this.identity = null;
      this._router.navigate(["/login"]);
    }
    
    initGamefication() {
      this.user.level = this._userGamificationService.getLevel();
      this.user.points = this._userGamificationService.getPoints();
    }
  
    openProgramacaoComponent() {
      const initialState = {
        title: "Programação",
      };
      this.bsModalRef = this._modalService.show(ScheduleComponent, {
        initialState,
        class: "modal-lg",
      });
      this.bsModalRef.content.closeBtnName = "Fechar";
    }
  
  
    openMagneticPassDistanceComponent(){
      const initialState = {
        title: "O passe pode ser dado à distância?",
      };
      this.bsModalRef = this._modalService.show(MagneticPassDistanceComponent, {
        initialState,
        class: "modal-lg",
      });
      this.bsModalRef.content.closeBtnName = "Fechar";
    }

    openFraternalSupportComponent() {
      const initialState = {
        title: "Apoio Fraterno?",
      };
      this.bsModalRef = this._modalService.show(FraternalSupportComponent, {
        initialState,
        class: "modal-lg",
      });
      this.bsModalRef.content.closeBtnName = "Fechar";
    }
  
    openCloseFraternalSupportChat() {
      this.showChat = !this.showChat;
      //this._tawkService.ExpandChatWindow(true);
      this._userGamificationService.setMissionComplete("Tira Dúvidas");
    }

    back() {
      this.location.back();
    }

    toggleClass() {
      var element = document.getElementById("sidebar");
      if (element.classList) {
        element.classList.toggle("active_jovem");
      } else {
        // For IE9
        var classes = element.className.split(" ");
        var i = classes.indexOf("active_jovem");
      
        if (i >= 0)
          classes.splice(i, 1);
        else
          classes.push("active_jovem");
          element.className = classes.join(" ");
      }
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
          "/jovem/audithorium",
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



