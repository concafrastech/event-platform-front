import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecture } from 'src/app/models/lecture';
import { Stage } from 'src/app/models/stage';
import { Trail } from 'src/app/models/trail';
import { ActivityService } from 'src/app/services/activity.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { LectureService } from 'src/app/services/lecture.service';
import { StageService } from 'src/app/services/stage.service';
import { TrailService } from 'src/app/services/trail.service';

@Component({
  selector: 'app-all-content',
  templateUrl: './all-content.component.html',
  styleUrls: ['./all-content.component.css'],
  providers: [
    LectureService,
    TrailService,
    StageService,
    ActivityService,
    ClassroomService,
  ],
})
export class AllContentComponent implements OnInit {
  public status: string;
  public lectures: Lecture[] = [];
  public trails: Trail[] = [];
  public stages: Stage[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _trailService: TrailService,
    private _stageService: StageService,
    private _activityService: ActivityService,
    private _classroomService: ClassroomService
  ) { }

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this.getLectures(1, epic._id);
    this.getTrails(1, epic._id);
    this.getStages(1, epic._id);
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

  getClassrooms(page, trail, ind) {
    if(trail.classrooms){
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
