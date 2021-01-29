import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Lecture } from 'src/app/models/lecture';
import { DocumentService } from 'src/app/services/document.service';
import { LectureService } from 'src/app/services/lecture.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-palestras',
  templateUrl: './palestras.component.html',
  styleUrls: ['./palestras.component.css'],
  providers: [LectureService, DocumentService]
})
export class PalestrasComponent implements OnInit {
  public lectureList: Lecture[] = [];

  constructor(
    private _lectureService: LectureService,
    private _documentService: DocumentService,
    private _navbarService: NavbarService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this._lectureService.getLectures(1, epic._id).subscribe((response) => {
      this.lectureList = response.lectures;
      this.loadThumbnails();
    });

    this._navbarService.setButtonBack(true);
  }

  loadThumbnails() {
    this.lectureList.map((lecture) => {
      console.log(lecture.thumbnail);
      if (lecture.thumbnail) {
        this._documentService
          .getDocument(lecture.thumbnail)
          .subscribe((response) => {
            lecture.thumbnail = response.document;
          });
      }
    });
  }

  goToAudithorium(item: Lecture) {
    this._router.navigate(["/audithorium", "workshop", item._id]);
  }

}
