import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Epic } from 'src/app/models/epic';
import { Lecture } from 'src/app/models/lecture';
import { EpicService } from 'src/app/services/epic.service';
import { LectureService } from 'src/app/services/lecture.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-lecture-add',
  templateUrl: './lecture-add.component.html',
  styleUrls: ['./lecture-add.component.css'],
  providers: [UserService, LectureService, EpicService]

})
export class LectureAddComponent implements OnInit {

  public title: string;
  public lectureId: string;
  public url: string;
  public status: string;
  public lecture: Lecture;
  public identity: string;
  public epics = [];
  public alturaTela: number;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _lectureService: LectureService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Adicionar Palestra';
    this.url = GLOBAL.url;
    this._bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    console.log('[OK] Component: lecture-add.');
    this.identity = this._userService.getIdentity();
    this.lecture = new Lecture('', '', '', '', '', new Date(), new Date(), null, [], new Date(), new Date());
    this.lecture.epic = new Epic('', '', '', '', '', null, new Date(), new Date());
    this.loadPage();

    //Adicionado altura da tela apenas para forçar a criação da barra de rolagem, rever css
    this.alturaTela = window.innerHeight > 0 ? window.innerHeight : screen.height;
  }

  loadPage() {
    this._epicService
    .getEpics()
    .subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
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
    this._lectureService.addLecture(this.lecture).subscribe(
          response => {
              if (!response.lecture) {
                  this.status = 'error';
              } else {
                  this.status = 'success';
                  this._router.navigate(['/admin/lecture/edit', response.lecture._id]);
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
