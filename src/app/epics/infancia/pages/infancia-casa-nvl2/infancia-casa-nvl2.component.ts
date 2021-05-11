import { Component, Input, OnInit, TemplateRef } from '@angular/core';
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
  public workshops: Lecture[] = [];
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

  doSomething(switchCase: number, index: number, template: TemplateRef<any>) {
    switch (switchCase) {
      case 0:
        this._router.navigate([
          '/concafrinhas/audithorium',
          'lecture',
          this.lectures[index]._id,
        ]);
        break;
      case 1:
        this.openModal(template);
        break;
      case 2:
        alert("Sem conteúdo");
        break;
      case 3:
        this.modalRef.hide();
        this._router.navigate([
          '/concafrinhas/audithorium',
          'lecture',
          this.workshops[index]._id,
        ]);
        break;
      default:
        console.log('Case Default');
        break;
    }
  }

  getLectures(epicId: any): void {
    this._lectureService.getFullLectures(epicId).subscribe((response) => {
      let resLectures = response.lectures;
      resLectures.map((lecture: Lecture) => {
        if (lecture.type == 'concafrinhas_temacentral') {
          this.lectures.push(lecture);
        } else if (lecture.type == 'concafrinhas_workshop') {
          this.workshops.push(lecture);
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

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }
}
