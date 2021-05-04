import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Epic } from 'src/app/models/epic';
import { Lecture } from 'src/app/models/lecture';
import { DocumentService } from 'src/app/services/document.service';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-infancia-casa-nvl2',
  templateUrl: './infancia-casa-nvl2.component.html',
  styleUrls: ['./infancia-casa-nvl2.component.css'],
  providers: [LectureService, DocumentService],
})
export class InfanciaCasaNvl2Component implements OnInit {
  @Input() public dialog: string;
  public epic: Epic;
  public status: string;
  public lectures: Lecture[] = [];
  public srcImgs: string[] = [];

  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,

    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _documentService: DocumentService
  ) {}

  ngOnInit() {
    let epic = JSON.parse(localStorage.getItem('currentEpic'));
    this.getLectures(epic._id);

    this.srcImgs.push(
      'assets/concafras2021/concafrinhas/CasaNivel2/CasaNivel2TemaCentral.png'
    );
    this.srcImgs.push(
      'assets/concafras2021/concafrinhas/CasaNivel2/CasaNivel2OficinaArte.png'
    );
    this.srcImgs.push(
      'assets/concafras2021/concafrinhas/CasaNivel2/CasaNivel2TemaEspecifico.png'
    );
  }

  goToAudithorium(index: number) {
    switch (index) {
      case 0:
        console.log('Case 0');
        this._router.navigate([
          '/concafrinhas/audithorium',
          'lecture',
          this.lectures[index]._id,
        ]);
        break;
      case 1:
        console.log('Case 1');
        break;
      case 2:
        console.log('Case 2');
        break;
      default:
        console.log('Case Default');
        break;
    }
  }

  getLectures(epicId: any): void {
    this._lectureService.getFullLectures(epicId).subscribe((response) => {
      let resLectures = response.lectures;
      resLectures.map((lecture) => {
        if (lecture.type == 'concafrinhas_alegria') {
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
            lecture.thumbnail = response.document;
          });
      }
    });
  }
}
