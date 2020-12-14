import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lecture } from 'src/app/models/lecture';
import { Content } from 'src/app/models/content';
import { LectureService } from 'src/app/services/lecture.service';

@Component({
  selector: 'app-audithorium',
  templateUrl: './audithorium.component.html',
  styleUrls: ['./audithorium.component.css'],
  providers: [LectureService]
})
export class AudithoriumComponent implements OnInit {

  public lecture : Lecture;
  public type : string; 
  public contents : Content[] = [];
  public activeSlideIndex = 0;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
  ) { }

  ngOnInit() {
    this.loadContents();
  }

  loadContents(){
    this._route.params.subscribe((params) => {
      this.type = params["type"];
      let id = params["id"];

      if (this.type == 'lecture'){
        this._lectureService.getLecture(id).subscribe(
          (response) => {
            if(response) {
              this.lecture = response.lecture;
              this.contents = this.lecture.contents;
            }
          }
        )
      }
      
    });
  }

}
