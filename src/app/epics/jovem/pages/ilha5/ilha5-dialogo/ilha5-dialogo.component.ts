import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { UserService } from 'src/app/services/user.service';
import { Epic } from 'src/app/models/epic';
import { Lecture } from 'src/app/models/lecture';
import { Stage } from 'src/app/models/stage';
import { Trail } from 'src/app/models/trail';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { LectureService } from 'src/app/services/lecture.service';
import { StageService } from 'src/app/services/stage.service';
import { TrailService } from 'src/app/services/trail.service';
import * as SvgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { BookClubComponent } from 'src/app/epics/main/book-club/book-club.component';
import { Schedule } from 'src/app/models/schedule';
import { EpicService } from 'src/app/services/epic.service';
import { RightSidebarComponent } from 'src/app/epics/main/right-sidebar/right-sidebar.component';

@Component({
  selector: 'app-ilha5-dialogo',
  templateUrl: './ilha5-dialogo.component.html',
  styleUrls: ['./ilha5-dialogo.component.css'],
  providers: [LectureService, TrailService, StageService, ActivityService, ClassroomService, EpicService]
})
export class Ilha5DialogoComponent implements OnInit, AfterViewInit {

  @Input() public dialog: string;
  public identity;
  public subscription: Subscription;
  public epic: Epic;
  public status: string;
  public lectures: Lecture[] = []; 
  public trails: Trail[] = [];
  public stages: Stage[] = [];
  public bsModalRef: BsModalRef;
  /* baseado em schedule.component.ts - início */
  //public epics: Epic[] = [];
  //public currentEpic: Epic;
  //public identity;
  public groupSchedules: any[] = [];
  public schedules: Schedule[] = [];
  //public status : string;
  public closeBtnName : string;
  public title : string;
  public strMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  /* baseado em schedule.component.ts - fim */
  public schedule: Schedule;
  public eventoSelecionado: Boolean = true;
  //=false; falta implementar quando seleciona um evento para mudar este status para true//
  public todaySchedule: Schedule[];
  public todayEvents: Lecture[] = [];

  options = { 
    zoomEnabled: true,
    controlIconsEnabled: true,
    minZoom: 0.5,
    maxZoom: 0.8,
    preventMouseEventsDefault: false,
    dblClickZoomEnabled: false
  };

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _lectureService: LectureService,
    private _trailService: TrailService,
    private _stageService: StageService,
    private _activityService: ActivityService,
    private _classroomService: ClassroomService,
    private _modalService: BsModalService,
    private _epicService: EpicService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let dialog = params['dialog'];
      this.dialog = dialog;
    });
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    this.epic = epic;
    this.identity = this._userService.getIdentity();
    this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    this.getLectures(1, epic._id);
    //this.getTrails(1,  epic._id);
    //this.getStages(1,  epic._id);
    //this.loadScheduleEpic();
  }

  ngAfterViewInit() {
    /*$( () => {
      // initializing the function
      let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#svgMap', this.options);
      svgPanZoom.zoom(0.6);
    });*/
  }

  getLectures(page, epicId) {
    this.schedules = [];
    this.groupSchedules = [];
    this._lectureService.getLectures(page, epicId).subscribe(
      (response) => {
        if (!response.lectures) {
          this.status = "error";
        } else {
          this.lectures = response.lectures;

          // transform lectures in schedules
          for(let i = 0; i < this.lectures.length; i++){
            this.schedule = new Schedule(
              this.lectures[i]._id,
              this.lectures[i].type,
              this.lectures[i].name,
              this.lectures[i].description,
              this.lectures[i].start_time,
              this.lectures[i].end_time
            );
            this.schedules.push(this.schedule);
          }

          this.schedules.sort(this.sortSchedules);
          for(let i = 0; i < this.schedules.length; i++){
            let day = new Date(this.schedules[i].start_time).getDate();
            let month = this.strMonths[new Date(this.schedules[i].start_time).getMonth()];
            let dayMonth = ("00" + day).slice(-2) + ' de ' + month;
            
            if(!this.findDayGroupSchedule(dayMonth)){
              this.groupSchedules.push({group: dayMonth, schedule: [this.schedules[i]]});
            }else{
              this.findDayGroupSchedule(dayMonth).schedule.push(this.schedules[i])
            }
          }

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

  getTrails(page, epicId) {
    this._trailService.getTrails(page, epicId).subscribe(
      (response) => {
        if (!response.trails) {
          this.status = "error";
        } else {
          this.trails = response.trails;

          //incluido filtro das trilhas da ilha
          // forcei um id 600757276f6f1200bda3c426 para funcionar pois o cadastro de teste chamava um curso inexistente
          this.trails = this.trails.filter((trail: Trail) => trail._id === "600757276f6f1200bda3c426");
          // this.trails = this.trails.filter((trail: Trail) => trail._id === this.subscription.trails[0]._id);

          this.trails.forEach((trail, index) => {
            this.getClassrooms(page, trail, index);
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

  getClassrooms(page, trail, index) {
    this._classroomService.getClassrooms(page, trail._id).subscribe(
      (response) => {
        if (!response.classrooms) {
          this.status = "error";
        } else {
          this.trails[index].classrooms = response.classrooms;
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

  getStages(page, epicId) {
    this._stageService.getFullStages(page, epicId).subscribe(
      (response) => {
        if (!response.stages) {
          this.status = "error";
        } else {
          this.stages = response.stages;

          //incluido filtro das trilhas da ilha
          this.stages = this.stages.filter((stage: Stage) => stage.type.toLowerCase() === "ilha estação ao vivo");

          this.stages.forEach((stage, index) => {
            this.getActivities(page, stage, index);
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

  getActivities(page, stage, index) {
    this._activityService.getActivities(page, stage._id).subscribe(
      (response) => {
        if (!response.activities) {
          this.status = "error";
        } else {
          this.stages[index].activities = response.activities;
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

  openBookClubComponent() {
    const initialState = {
      title: "Escolha como deseja acessar o nosso curso:",
    };
    this.bsModalRef = this._modalService.show(BookClubComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }


  getTime(addValue) : string {
    var today = new Date();
    var hours = today.getHours();
    var minutes = today.getMinutes() + addValue;
    if(minutes >= 60) {
      hours = hours + Math.floor(minutes/60);
      minutes = minutes % 60;
      if(hours >= 24) {
        hours = hours - 24;
      }
    }
    if(minutes >= 10) {
      var time = hours + ":" + minutes;
    }
    else {
      var time = hours + ":0" + minutes;
    }
    
    return time;
  }
  
  /* baseado em schedule.component.ts - início */
  
  findDayGroupSchedule(group: string){
    return this.groupSchedules.find((item, index, arr)=>{
      if(item.group == group){
        return true
      }
    })
  }

  sortSchedules(obj1:Schedule, obj2:Schedule){
    if(obj1.start_time < obj2.start_time){
      return -1;
    }
    if(obj1.start_time > obj2.start_time){
      return 1;
    }
    return 0;
  }

  loadScheduleEpic(){
    this.schedules = [];
    this.groupSchedules = [];
    this._epicService.getSchedules(this.epic._id, this.identity._id).subscribe(
      (response) => {
        if(response){
          this.schedules = response;
          console.log(response);
          
          this.schedules.sort(this.sortSchedules);
          for(let i = 0; i < this.schedules.length; i++){
            let day = new Date(this.schedules[i].start_time).getDate();
            let month = this.strMonths[new Date(this.schedules[i].start_time).getMonth()];
            let dayMonth = ("00" + day).slice(-2) + ' de ' + month;
            
            if(!this.findDayGroupSchedule(dayMonth)){
              this.groupSchedules.push({group: dayMonth, schedule: [this.schedules[i]]});
            }else{
              this.findDayGroupSchedule(dayMonth).schedule.push(this.schedules[i])
            }
          }
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

  /* baseado em schedule.component.ts - fim */
  
  /* baseado em hub.component.ts - inicio */
  /*
  loadScheduleEpic() {
    this.todaySchedule = [];
    this._epicService
      .getSchedules(this.currentEpic._id, this.identity._id)
      .subscribe(
        (response) => {

          if (response) {
            let schedules = response;
            schedules.sort(this.sortSchedules);

            //Monta agenda do dia
            for (let i = 0; i < schedules.length; i++) {
              this.createTodaySchedule(schedules[i]);
            }
          }
        },
        (error) => {
          var errorMessage = <any>error;
          console.log(errorMessage);

          if (errorMessage != null) {
            this.status = "error";
          }
        },
        () => {
          this.getTodayEvents();
        }
      );
  }
  

  //Ordena agenda
  sortSchedules(obj1: Schedule, obj2: Schedule) {
    if (obj1.start_time < obj2.start_time) {
      return -1;
    }
    if (obj1.start_time > obj2.start_time) {
      return 1;
    }
    return 0;
  }
  */

  //Cria agenda do dia
  createTodaySchedule(schedule: Schedule) {
    let today = new Date();
    let startDay = new Date(schedule.start_time);
    let todayTime = today.getTime();
    let startTime = startDay.getTime();
    let endTime = new Date(schedule.end_time).getTime();

    //Só permite schedule do tipo lecture
    if (schedule.type == "lecture") {
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
  }

  //Busca somente eventos do palco principal
  getTodayEvents() {
    this.todaySchedule.map((schedule) => {
      this._lectureService.getLecture(schedule.id).subscribe((response) => {
        if (
          response.lecture.type == "workshop" ||
          response.lecture.type == "momento_coletivo"
        ) {
          this.todayEvents.push(response.lecture);
        }
      });
    });
  }

   //Busca evento que esteja acontecendo agora.
   eventIsHappening(): string {
    let today = new Date();

    for (let i = 0; this.todayEvents.length; i++) {
      let start = new Date(this.todayEvents[i].start_time);
      let end = new Date(this.todayEvents[i].end_time);

      //Ainda não acabou e já começou
      if (
        today.getTime() < end.getTime() &&
        today.getTime() >= start.getTime()
      ) {
        return `/audithorium/lecture/${this.todayEvents[i]._id}`;
      }
    }
    return '';
  }

}
