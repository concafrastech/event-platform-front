import { AfterViewInit, Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { User } from "src/app/models/user";
import { UserService } from 'src/app/services/user.service';
import { Epic } from 'src/app/models/epic';
//import { Lecture } from 'src/app/models/lecture';
import { Stage } from 'src/app/models/stage';
import { Trail } from 'src/app/models/trail';
import { Classroom } from 'src/app/models/classroom';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassroomService } from 'src/app/services/classroom.service';
//import { LectureService } from 'src/app/services/lecture.service';
import { StageService } from 'src/app/services/stage.service';
import { TrailService } from 'src/app/services/trail.service';
import { Schedule } from 'src/app/models/schedule';
import * as SvgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery';
import { Content } from 'src/app/models/content';
import { ContentService} from 'src/app/services/content.service';
import { UserGamificationService } from "src/app/services/user-gamification.service";

@Component({
  selector: 'app-ilha3-dialogo',
  templateUrl: './ilha3-dialogo.component.html',
  styleUrls: ['./ilha3-dialogo.component.css'],
  providers: [TrailService, StageService, ActivityService, ClassroomService, ContentService]
})
export class Ilha3DialogoComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() public dialog: String;
  public identity;
  public subscription: Subscription;
  public epic: Epic;
  public status: String;
  //public lectures: Lecture[] = []; 
  //public trails: Trail[] = [];
  public stages: Stage[] = [];
  public trails: Trail[] = [];
  public classroomList: Classroom[] = [];
  public time: String;
  public groupSchedules: any[] = [];
  public schedules: Schedule[] = [];
  public strMonths = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"]
  /* baseado em schedule.component.ts - fim */
  public schedule: Schedule;
  public userName: String;
  public showSelect: Boolean = false;
  public zoomId: String;
  public videoId: String;
  public audioId: String;
  public classroom: Classroom;
  public contentList: Content[] = [];
  public user: User;
  public defaultPratical: Classroom;
  public userPratical: Classroom;

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
    //private _lectureService: LectureService,
    private _trailService: TrailService,
    private _stageService: StageService,
    private _activityService: ActivityService,
    private _classroomService: ClassroomService,
    private _contentService: ContentService,
    public _userGamificationService: UserGamificationService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let dialog = params['dialog'];
      this.dialog = dialog;

      let epic = JSON.parse(localStorage.getItem('currentEpic'));
      this.identity = this._userService.getIdentity();
      if(!this.identity.nick) {
        this.userName = this.identity.name;
      } else {
        this.userName = this.identity.nick;
      }
      this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
      this.user = this.subscription.user;
      //this.getLectures(1, epic._id);
      //this.getTrails(1,  epic._id);
      this.getStages(1,  epic._id);
      if(this.subscription){
        this.trails = this.subscription.trails;
      }
      this.schedules = [];
      this.trails.forEach((trail, index) => {
        this.getClassrooms(trail, index);
      });
    });
  }

  ngAfterViewInit() {
    /*$( () => {
      // initializing the function
      let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#svgMap', this.options);
      svgPanZoom.zoom(0.6);
    });*/
  }

  ngOnDestroy() {
    this.showSelect = false;
  }

  /*
  getLectures(page, epicId) {
    this._lectureService.getLectures(page, epicId).subscribe(
      (response) => {
        if (!response.lectures) {
          this.status = "error";
        } else {
          this.lectures = response.lectures;
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
  */

  /*
  getTrails(page, epicId) {
    this._trailService.getTrails(page, epicId).subscribe(
      (response) => {
        if (!response.trails) {
          this.status = "error";
        } else {
          this.trails = response.trails;

          //incluido filtro das trilhas da ilha
          this.trails = this.trails.filter((trail: Trail) => trail._id === this.subscription.trails[0]._id);

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
  */

  getClassrooms(trail, index) {
    if(trail.classrooms){
      trail.classrooms.forEach((classroom, index) => {
        this._classroomService.getClassroom(classroom).subscribe(
          (response) => {
            let classroomaux = response.classroom;
            classroomaux.start_time = new Date(classroomaux.start_time);
            classroomaux.end_time = new Date(classroomaux.end_time);
            trail.classrooms[index] = classroomaux;

            // transform classrooms in schedules (only teóricas)
            if ((!trail.classrooms[index].type ||
              !trail.classrooms[index].type == null) &&
              trail.classrooms[index].tags.map(tag => tag.toUpperCase()).includes(this.user.state.toUpperCase())) {
              this.schedule = new Schedule(
                trail.classrooms[index]._id,
                trail.classrooms[index].type,
                trail.classrooms[index].name,
                trail.classrooms[index].description,
                trail.classrooms[index].start_time,
                trail.classrooms[index].end_time
              );
              this.schedules.push(this.schedule);
            }
            this.schedules.sort(this.sortSchedules);
            this.groupSchedules = [];
            for(let i = 0; i < this.schedules.length; i++) {
              let day = new Date(this.schedules[i].start_time).getDate();
              let month = this.strMonths[new Date(this.schedules[i].start_time).getMonth()];
              let dayMonth = ("00" + day).slice(-2) + ' de ' + month;
              if(!this.findDayGroupSchedule(dayMonth)){
                this.groupSchedules.push({group: dayMonth, schedule: [this.schedules[i]]});
              }else{
                this.findDayGroupSchedule(dayMonth).schedule.push(this.schedules[i])
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
      });
      if (!this.schedules || this.schedules == null || this.schedules.length == 0) {
        trail.classrooms.forEach((classroom, index) => {
          this._classroomService.getClassroom(classroom).subscribe(
            (response) => {
              let classroomaux = response.classroom;
              classroomaux.start_time = new Date(classroomaux.start_time);
              classroomaux.end_time = new Date(classroomaux.end_time);
              trail.classrooms[index] = classroomaux;
    
              // transform classrooms in schedules (only teóricas)
              if ((!trail.classrooms[index].type ||
                !trail.classrooms[index].type == null) &&
                (!trail.classrooms[index].tags ||
                trail.classrooms[index].tags == null ||
                trail.classrooms[index].tags.length == 0)) {

                this.schedule = new Schedule(
                  trail.classrooms[index]._id,
                  trail.classrooms[index].type,
                  trail.classrooms[index].name,
                  trail.classrooms[index].description,
                  trail.classrooms[index].start_time,
                  trail.classrooms[index].end_time
                );
                this.schedules.push(this.schedule);
              }
              this.schedules.sort(this.sortSchedules);
              this.groupSchedules = [];
              for(let i = 0; i < this.schedules.length; i++) {
                let day = new Date(this.schedules[i].start_time).getDate();
                let month = this.strMonths[new Date(this.schedules[i].start_time).getMonth()];
                let dayMonth = ("00" + day).slice(-2) + ' de ' + month;
                if(!this.findDayGroupSchedule(dayMonth)){
                  this.groupSchedules.push({group: dayMonth, schedule: [this.schedules[i]]});
                }else{
                  this.findDayGroupSchedule(dayMonth).schedule.push(this.schedules[i])
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
        });
      }
    }
  }

  getStages(page, epicId) {
    this._stageService.getFullStages(page, epicId).subscribe(
      (response) => {
        if (!response.stages) {
          this.status = "error";
        } else {
          this.stages = response.stages;

          //incluido filtro das trilhas da ilha
          this.stages = this.stages.filter((stage: Stage) => stage.type.toLowerCase() === "ilha casa do caminho");

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

  SelectContent(i) {
    let today = new Date();
    let start = new Date(this.schedules[i].start_time);
    let end = new Date(this.schedules[i].end_time);
    //Ainda não acabou e já começou
    if (
      today.getTime() < end.getTime() &&
      today.getTime() >= (start.getTime() - 3000000)
    ) {
      this._classroomService.getClassroom(this.schedules[i].id).subscribe((response) => {
        if(response.classroom) {
          this.classroom = response.classroom;
          if (this.classroom.contents) {
            this.zoomId = "";
            this.videoId = "";
            this.audioId = "";
            this.classroom.contents.forEach((content, index) => {
              this._contentService.getContent(content).subscribe((response) => {
                let content = response.content;
                this.classroom.contents[index] = content;
                if(this.classroom.contents[index].type == "youtube") {
                  this.videoId = this.classroom.contents[index]._id;
                }
                if(this.classroom.contents[index].type == "zoom") {
                  this.zoomId = this.classroom.contents[index]._id;
                }
                if(this.classroom.contents[index].type == "audio") {
                  this.audioId = this.classroom.contents[index]._id;
                }
              });
            });
            this.showSelect = !this.showSelect;
            setTimeout(function(){ window.scrollTo(1000,document.body.scrollHeight); }, 300);
            this._userGamificationService.setMissionComplete("Vivência Prática de Voluntariado Espírita");
          }
        }
      });
    } else {
      //mensagem que não começou ou já acabou
      alert("Selecione um tema específico que esteja ocorrendo neste momento!")
    }
    
    
  }
}
