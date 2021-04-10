import { Component, TemplateRef } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { Lecture } from "src/app/models/lecture";
import { LectureService } from "src/app/services/lecture.service";

@Component({
  selector: "app-infancia-roda-alegria",
  templateUrl: "./infancia-roda-alegria.component.html",
  styleUrls: ["./infancia-roda-alegria.component.css"],
  providers: [BsModalService, LectureService],
})
export class InfanciaRodaAlegriaComponent {
  modalRef: BsModalRef;
  lectures: Lecture[];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _modalService: BsModalService,
    private _lectureService: LectureService
  ) {}

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this.getLectures(epic._id);
  }

  getLectures(epicId): void {
    this._lectureService.getFullLectures(epicId).subscribe((response) => {
      this.lectures = response.lectures;
    });
  }

  openModal(template: TemplateRef<any>, index) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    console.log(this.lectures[index].name);
    // this._router.navigate(["/concafrinhas/audithorium", "lecture", "1"]);
    // this.modalRef = this._modalService.show(template);
  }

  goToAudithorium(index) {
    console.log(this.lectures[index]._id);
    this._router.navigate([
      "/concafrinhas/audithorium",
      "lecture",
      this.lectures[index]._id,
    ]);
  }
}
