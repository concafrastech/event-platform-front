import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { UserService } from 'src/app/services/user.service';
import { Epic } from 'src/app/models/epic';
import { Lecture } from 'src/app/models/lecture';
import { Stage } from 'src/app/models/stage';
import { Trail } from 'src/app/models/trail';
import { Classroom } from 'src/app/models/classroom';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { LectureService } from 'src/app/services/lecture.service';
import { StageService } from 'src/app/services/stage.service';
import { TrailService } from 'src/app/services/trail.service';
import * as SvgPanZoom from 'svg-pan-zoom';
import * as $ from 'jquery';

@Component({
  selector: 'app-jovem-classroom',
  templateUrl: './jovem-classroom.component.html',
  styleUrls: ['./jovem-classroom.component.css'],
  providers: [LectureService, TrailService, StageService, ActivityService, ClassroomService]
})
export class JovemClassroomComponent implements OnInit, AfterViewInit {

  @Input() public id: string;
  @Input() public type: string;
  public identity;
  public subscription: Subscription;
  public epic: Epic;
  public status: string;
  public lectures: Lecture[] = []; 
  public trails: Trail[] = [];
  public stages: Stage[] = [];
  public trailsFilteredList: Trail[] = [];

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
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let type = params['type'];
      this.type = type;
      let id = params['id'];
      this.id = id;
    });
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    this.identity = this._userService.getIdentity();
    this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    //this.getLectures(1, epic._id);
    this.getTrails(1,  epic._id);
    //this.getStages(1,  epic._id);
  }

  
  ngAfterViewInit() {
    /*$( () => {
      // initializing the function
      let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#svgMap', this.options);
      svgPanZoom.zoom(0.6);
    });*/
  }

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

  getTrails(page, epicId) {
    this._trailService.getTrails(page, epicId).subscribe(
      (response) => {
        if (!response.trails) {
          this.status = "error";
        } else {
          this.trails = response.trails;
          //incluido filtro dos temas
          this.trailsFilteredList = this.trails.filter((trail: Trail) => trail._id === this.id);
          this.trails = this.trailsFilteredList;
          //this.trails.forEach((trail, index) => {
          //  this.getClassrooms(page, trail, index);
          //});
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
    this._stageService.getStages(page, epicId).subscribe(
      (response) => {
        if (!response.stages) {
          this.status = "error";
        } else {
          this.stages = response.stages;
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

}


