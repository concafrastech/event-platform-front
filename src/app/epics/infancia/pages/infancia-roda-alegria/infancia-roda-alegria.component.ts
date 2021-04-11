import { Component, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Lecture } from "src/app/models/lecture";
import { DocumentService } from "src/app/services/document.service";
import { LectureService } from "src/app/services/lecture.service";

@Component({
  selector: "app-infancia-roda-alegria",
  templateUrl: "./infancia-roda-alegria.component.html",
  styleUrls: ["./infancia-roda-alegria.component.css"],
  providers: [LectureService, DocumentService],
})
export class InfanciaRodaAlegriaComponent {
  lectures: Lecture[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _documentService: DocumentService
  ) {}

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this.getLectures(epic._id);
  }

  getLectures(epicId): void {
    this._lectureService.getFullLectures(epicId).subscribe((response) => {
      let resLectures = response.lectures;
      resLectures.map((lecture) => {
        if (lecture.type == "concafrinhas_alegria") {
          this.lectures.push(lecture);
          console.log(this.lectures);
        }
      });
      this.loadThumbnail();
    });
  }

  loadThumbnail(): void {
    this.lectures.map((lecture) => {
      if (lecture.thumbnail) {
        this._documentService
          .getDocument(lecture.thumbnail)
          .subscribe((response) => {
            console.log(response);
            lecture.thumbnail = response.document;
          });
      }
    });
  }

  goToAudithorium(index) {
    this._router.navigate([
      "/concafrinhas/audithorium",
      "lecture",
      this.lectures[index]._id,
    ]);
  }
}
