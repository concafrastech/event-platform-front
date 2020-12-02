import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Epic } from 'src/app/models/epic';
import { Stage } from 'src/app/models/stage';
import { EpicService } from 'src/app/services/epic.service';
import { StageService } from 'src/app/services/stage.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-stage-add',
  templateUrl: './stage-add.component.html',
  styleUrls: ['./stage-add.component.css'],
  providers: [UserService, StageService, EpicService]

})
export class StageAddComponent implements OnInit {

  public title: string;
  public stageId: string;
  public url: string;
  public status: string;
  public stage: Stage;
  public identity: string;
  public epics = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _stageService: StageService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Adicionar Trilha';
    this.url = GLOBAL.url;
    this._bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    console.log('[OK] Component: stage-add.');
    this.identity = this._userService.getIdentity();
    this.stage = new Stage('', 0, '', '', '', null, new Date(), new Date());
    this.stage.epic = new Epic('', '', '', '', '', null, new Date(), new Date());
    this.loadPage();
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
      this._stageService.addStage(this.stage).subscribe(
          response => {
              if (!response.stage) {
                  this.status = 'error';
              } else {
                  this.status = 'success';
                  this._router.navigate(['/admin/stage/edit', response.stage._id]);
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
