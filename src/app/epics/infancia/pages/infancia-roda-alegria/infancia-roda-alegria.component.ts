import { Content } from "@angular/compiler/src/render3/r3_ast";
import { Component, TemplateRef } from "@angular/core";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Lecture } from "src/app/models/lecture";
import { ContentService } from "src/app/services/content.service";
import { DocumentService } from "src/app/services/document.service";
import { LectureService } from "src/app/services/lecture.service";

@Component({
  selector: "app-infancia-roda-alegria",
  templateUrl: "./infancia-roda-alegria.component.html",
  styleUrls: ["./infancia-roda-alegria.component.css"],
  providers: [BsModalService, LectureService, ContentService, DocumentService],
})
export class InfanciaRodaAlegriaComponent {
  modalRef: BsModalRef;
  lectures: Lecture[];
  titleVideo: string;
  contents: Content[] = [];
  contentVideo: Content;

  constructor(
    private _modalService: BsModalService,
    private _lectureService: LectureService,
    private _contentService: ContentService,
    private _documentService: DocumentService
  ) {}

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this.getLectures(epic._id);
  }

  getLectures(epicId): void {
    this._lectureService.getFullLectures(epicId).subscribe((response) => {
      this.lectures = response.lectures;

      this.lectures.map((lecture) => {
        this.getContent(lecture.contents[0]);
      });
    });
  }

  getContent(id): void {
    this._contentService.getContent(id).subscribe((response) => {
      this.contents.push(response.content);
    });
  }

  openModal(template: TemplateRef<any>, index) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    console.log(this.lectures[index].name);
    console.log(this.contents[index]);
    this.titleVideo = this.lectures[index].name;
    this.contentVideo = this.contents[index];
    this.modalRef = this._modalService.show(template);
  }
}
