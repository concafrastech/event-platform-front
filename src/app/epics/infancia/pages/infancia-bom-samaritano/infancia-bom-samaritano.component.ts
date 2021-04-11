import { Component, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Lecture } from "src/app/models/lecture";
import { DocumentService } from "src/app/services/document.service";
import { LectureService } from "src/app/services/lecture.service";

@Component({
  selector: "app-infancia-bom-samaritano",
  templateUrl: "./infancia-bom-samaritano.component.html",
  styleUrls: ["./infancia-bom-samaritano.component.css"],
  providers: [LectureService, DocumentService],
})
export class InfanciaBomSamaritanoComponent {
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
      let resLecture = response.lectures;
      resLecture.map((lecture) => {
        if (lecture.type == "bom_samaritano_infantil") {
          this.lectures.push(lecture);
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
