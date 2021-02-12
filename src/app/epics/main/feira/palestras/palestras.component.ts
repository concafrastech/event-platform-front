import { ContentService } from "./../../../../services/content.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { Lecture } from "src/app/models/lecture";
import { DocumentService } from "src/app/services/document.service";
import { LectureService } from "src/app/services/lecture.service";
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: "app-palestras",
  templateUrl: "./palestras.component.html",
  styleUrls: ["./palestras.component.css"],
  providers: [LectureService, ContentService, DocumentService],
})
export class PalestrasComponent implements OnInit {
  public lectureList: Lecture[] = [];

  constructor(
    private _lectureService: LectureService,
    private _contentService: ContentService,
    private _documentService: DocumentService,
    private _navbarService: NavbarService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this._lectureService.getFullLectures(epic._id).subscribe((response) => {
      response.lectures.forEach(lecture => {
        if (
          lecture.type =="palestra" ||
          lecture.type =="especial"
        ) {
          this.lectureList.push(lecture);
        }
      });
      this.loadThumbnails();
      this.loadContents();
    });

    this._navbarService.setButtonBack(true);
  }

  loadThumbnails() {
    this.lectureList.map((lecture) => {
      if (lecture.thumbnail) {
        this._documentService
          .getDocument(lecture.thumbnail)
          .subscribe((response) => {
            lecture.thumbnail = response.document;
          });
      }
    });
  }

  loadContents() {
    this.lectureList.map((lecture, index) => {
    });
  }

  goToAudithorium(item: Lecture) {
    let contentVideoId;
    item.contents.map((content, index) => {
      this._contentService.getContent(content).subscribe({
        next: (response) => {
          console.log("Conteúdo:");
          console.log(response.content);
          item.contents[index] = response.content;
        },
        error: null,
        complete: () => {
          for (let i = 0; i < item.contents.length; i++) {
            if (item.contents[i].type == "youtube") {
              contentVideoId = item.contents[i]._id;
              break;
            }
          }
          if (contentVideoId) {
            this._router.navigate(
              ["/audithorium-special", "workshop", contentVideoId],
              { queryParams: item }
            );
          } else {
            //TODO colocar mensagem de que palestra não tem video;
            alert("Palestra sem video do YouTube.");
          }
        },
      });
    });
  }
}
