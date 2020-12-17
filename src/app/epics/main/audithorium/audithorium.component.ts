import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Lecture } from "src/app/models/lecture";
import { Activity } from "./../../../models/activity";
import { Classroom } from "./../../../models/classroom";
import { Content } from "src/app/models/content";
import { LectureService } from "src/app/services/lecture.service";
import { ClassroomService } from "./../../../services/classroom.service";
import { ActivityService } from "src/app/services/activity.service";

@Component({
  selector: "app-audithorium",
  templateUrl: "./audithorium.component.html",
  styleUrls: ["./audithorium.component.css"],
  providers: [LectureService, ClassroomService, ActivityService],
})
export class AudithoriumComponent implements OnInit {
  public lecture: Lecture;
  public classroom: Classroom;
  public activity: Activity;

  public type: string;
  public contents: Content[] = [];
  //public activeSlideIndex = 0;
  public actualContent: Content;

  public index: number;
  public secondsToNext: number = 2;
  public canMoveForward: boolean = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _classroomService: ClassroomService,
    private _activityService: ActivityService
  ) {}

  ngOnInit() {
    
  }

  ngAfterContentInit(): void {
    this.loadContents();
  }

  loadContents() {
    this._route.params.subscribe((params) => {
      this.type = params["type"];
      let id = params["id"];

      //Busca conteúdos e prepara exibição inicial
      switch (this.type) {
        case "lecture": {
          this._lectureService.getLecture(id).subscribe((response) => {
            this.lecture = response.lecture;
            this.handleDisplay(this.lecture.contents);
          });
          break;
        }
        case "classroom": {
          this._classroomService.getClassroom(id).subscribe((response) => {
            this.classroom = response.classroom;
            this.handleDisplay(this.lecture.contents);
          });
          break;
        }
        case "activity": {
          this._activityService.getActivity(id).subscribe((response) => {
            this.activity = response.acitivity;
            this.handleDisplay(this.lecture.contents);
          });
          break;
        }
      }
    });
  }

  //Prepara exibição inicial
  handleDisplay(contents: Content[]) {
    this.contents = contents;
    this.actualContent = this.lecture.contents[0];
    console.log(this.contents);
    
    this.index = 0;
    this.timeToMoveForward();
  }

  //Exibe próximo conteúdo
  nextContent() {
    if (this.contents) {
      if (this.index < this.contents.length - 1) {
        this.canMoveForward = false;
        this.index += 1;
        this.actualContent = this.contents[this.index];
        console.log("Arquivo a ser exibido");
        console.log(this.actualContent);
        this.timeToMoveForward();
      }
    }
  }

  //Exibe conteúdo anterior
  previousContent() {
    if (this.contents) {
      if (this.index > 0) {
        this.index -= 1;
        this.actualContent = this.contents[this.index];
      }
    }
  }

  //Bloqueia o botão 'Próximo' por N segundos
  timeToMoveForward() {
    setTimeout(() => {
      this.canMoveForward = true;
    }, this.secondsToNext * 1000);
  }
}
