import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Trail } from 'src/app/models/trail';
import { Classroom } from 'src/app/models/classroom';
import { TrailService } from 'src/app/services/trail.service';
import { ClassroomService } from 'src/app/services/classroom.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-classroom-add',
  templateUrl: './classroom-add.component.html',
  styleUrls: ['./classroom-add.component.css'],
  providers: [UserService, ClassroomService, TrailService]

})
export class ClassroomAddComponent implements OnInit {

  public title: string;
  public classroomId: string;
  public url: string;
  public status: string;
  public classroom: Classroom;
  public identity: string;
  public trails = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _classroomService: ClassroomService,
    private _userService: UserService,
    private _trailService: TrailService,
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Adicionar Palestra';
    this.url = GLOBAL.url;
    this._bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    console.log('[OK] Component: classroom-add.');
    this.identity = this._userService.getIdentity();
    this.classroom = new Classroom('', '', '', '', new Date(), new Date(), null, [], new Date(), new Date());
    this.classroom.trail = new Trail('', '', '', '', '', null, new Date(), new Date());
    this.loadPage();
  }

  loadPage() {
    this._trailService
    .getTrails()
    .subscribe(
      (response) => {
        if (response) {
          this.trails = response.trails;
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

    /* Return true or false if it is the selected */
    compareByOptionId(idFist, idSecond) {
        return idFist && idSecond && idFist._id == idSecond._id;
      }

  onSubmit() {
      this._classroomService.addClassroom(this.classroom).subscribe(
          response => {
              if (!response.classroom) {
                  this.status = 'error';
              } else {
                  this.status = 'success';
                  this._router.navigate(['/admin/classroom/edit', response.classroom._id]);
              }
          },
          error => {
              var errorMessage = <any> error;
              console.log(errorMessage);
              if (errorMessage != null) {
                  this.status = 'error';
              }
          }
      );
  }

}
