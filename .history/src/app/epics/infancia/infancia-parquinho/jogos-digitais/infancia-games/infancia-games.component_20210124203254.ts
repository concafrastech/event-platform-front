import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { LectureService } from 'src/app/services/lecture.service';
import { TrailService } from 'src/app/services/trail.service';
import { StageService } from 'src/app/services/stage.service';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { Subscription } from 'src/app/models/subscription';
import { Epic } from 'src/app/models/epic';
import { Lecture } from 'src/app/models/lecture';
import { Trail } from 'src/app/models/trail';
import { Stage } from 'src/app/models/stage';

@Component({
  selector: 'app-infancia-games',
  templateUrl: './infancia-games.component.html',
  styleUrls: ['./infancia-games.component.css']
})
export class InfanciaGamesComponent implements OnInit {
  // @Input() public brincadeira: string;

  // constructor(
  //   private _route: ActivatedRoute,
  //   private _router: Router,

  // ) { }

  // ngOnInit(): void {
  //   this._route.params.subscribe(params => {
  //     let gameid = params['id'];
  //     this.brincadeira = gameid;
  //   });

  // }

  @Input() public brincadeira: string;
  public identity;
  public subscription: Subscription;
  public epic: Epic;
  public status: string;
  public lectures: Lecture[] = []; 
  public trails: Trail[] = [];
  public stages: Stage[] = [];
  public trailsFilteredList: Trail[] = [];
  public stagesFilteredList: Stage[] = [];

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
    private _classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let play = params['brincadeira'];
      this.brincadeira = play;
    });
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    this.identity = this._userService.getIdentity();
    this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    this.getLectures(1, epic._id);
    this.getTrails(1,  epic._id);
    this.getStages(1,  epic._id);
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

          //incluido filtro das trilhas da ilha
          // forcei um id 600757276f6f1200bda3c426 para funcionar pois o cadastro de teste chamava um curso inexistente
          this.trailsFilteredList = this.trails.filter((trail: Trail) => trail._id === "600757276f6f1200bda3c426");
          // this.trailsFilteredList = this.trails.filter((trail: Trail) => trail._id === this.subscription.trails[0]._id);
          this.trails = this.trailsFilteredList;

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
    this._stageService.getStages(page, epicId).subscribe(
      (response) => {
        if (!response.stages) {
          this.status = "error";
        } else {
          this.stages = response.stages;

          //incluido filtro das trilhas da ilha
          this.stagesFilteredList = this.stages.filter((stage: Stage) => stage.type === "Novas Dimensões");
          this.stages = this.stagesFilteredList;

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
