import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Lecture } from 'src/app/models/lecture';
import { Stage } from 'src/app/models/stage';
import { Trail } from 'src/app/models/trail';
import { LectureService } from 'src/app/services/lecture.service';
import { StageService } from 'src/app/services/stage.service';
import { TrailService } from 'src/app/services/trail.service';
import * as SvgPanZoom from 'svg-pan-zoom';

@Component({
  selector: 'app-hub',
  templateUrl: './hub.component.html',
  styleUrls: ['./hub.component.css'],
  providers: [LectureService, TrailService, StageService]
})
export class HubComponent implements OnInit, AfterViewInit {

  public status: string;
  public lectures: Lecture[] = []; 
  public trails: Trail[] = [];
  public stages: Stage[] = [];

  options = { 
    zoomEnabled: true,
    controlIconsEnabled: true,
    minZoom: 0.1,
    maxZoom: 10,
    preventMouseEventsDefault: false,
    dblClickZoomEnabled: false
  };

  constructor(
    private _lectureService: LectureService,
    private _trailService: TrailService,
    private _stageService: StageService
  ) { }

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    this.getLectures(1, epic._id);
    this.getTrails(1,  epic._id);
    this.getStages(1,  epic._id);
  }

  ngAfterViewInit() {
    // initializing the function
    let svgPanZoom: SvgPanZoom.Instance = SvgPanZoom('#svgMap', this.options);
    /* see typing definiton for more APIs. */
    svgPanZoom.zoom(0.8);

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
