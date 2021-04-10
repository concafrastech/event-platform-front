import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Activity } from "src/app/models/activity";
import { Classroom } from "src/app/models/classroom";
import { Content } from "src/app/models/content";
import { Lecture } from "src/app/models/lecture";
import { ActivityService } from "src/app/services/activity.service";
import { ClassroomService } from "src/app/services/classroom.service";
import { ContentService } from "src/app/services/content.service";
import { DocumentService } from "src/app/services/document.service";
import { LectureService } from "src/app/services/lecture.service";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-infancia-audithorium",
  templateUrl: "./infancia-audithorium.component.html",
  styleUrls: ["./infancia-audithorium.component.css"],
  providers: [
    LectureService,
    ClassroomService,
    ActivityService,
    ContentService,
    DocumentService,
    NavbarService,
  ],
})
export class InfanciaAudithoriumComponent implements OnInit {
  public lecture: Lecture;
  public classroom: Classroom;
  public activity: Activity;

  public type: string;
  public contents: Content[] = [];
  public lectureType: string;
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
    private _activityService: ActivityService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _navbarService: NavbarService
  ) {}

  ngOnInit() {
    this._navbarService.setButtonBack(true);
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
            this.lectureType = this.lecture.type;
            this.handleDisplay(this.lecture.contents);
          });
          break;
        }
        case "classroom": {
          this._classroomService.getClassroom(id).subscribe((response) => {
            this.classroom = response.classroom;
            this.classroom.contents.forEach((content, index) => {
              this._contentService.getContent(content).subscribe((response) => {
                let contentAux = response.content;
                this.classroom.contents[index] = contentAux;
                this.handleDisplay(this.classroom.contents);
                if (contentAux.file) {
                  this._documentService
                    .getDocument(contentAux.file)
                    .subscribe((response) => {
                      this.classroom.contents[index].file = response.document;
                    });
                }
              });
            });
          });
          break;
        }
        case "activity": {
          this._activityService.getActivity(id).subscribe((response) => {
            this.activity = response.activity;
            this.handleDisplay(this.activity.contents);
          });
          break;
        }
        //Para exibir somente zoom
        case "zoom": {
          this._classroomService
            .getClassroom(id)
            .subscribe((responseClassroom) => {
              //this.classroom = response.classroom;
              //this.classroom.contents = [];
              responseClassroom.classroom.contents.forEach((content, index) => {
                this._contentService
                  .getContent(content)
                  .subscribe((response) => {
                    let contentAux = response.content;
                    if (contentAux.type == "zoom") {
                      this.classroom = responseClassroom.classroom;
                      this.classroom.contents = [];
                      this.classroom.contents[0] = contentAux;
                      this.handleDisplay(this.classroom.contents);
                    }
                  });
              });
            });
          break;
        }
      }
    });
  }

  //Prepara exibição inicial
  handleDisplay(contents: Content[]) {
    this.contents = contents;
    this.actualContent = this.contents[0];
    if (this.actualContent.type == "doc") {
      this.actualContent.url = this.actualContent.file.fileLink;
    }

    this.index = 0;
    this.timeToMoveForward();
  }

  //Exibe próximo conteúdo
  nextContent() {
    this.actualContent = null;
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
