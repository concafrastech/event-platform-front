import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Epic } from 'src/app/models/epic';
import { Trail } from 'src/app/models/trail';
import { EpicService } from 'src/app/services/epic.service';
import { TrailService } from 'src/app/services/trail.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-trail-add',
  templateUrl: './trail-add.component.html',
  styleUrls: ['./trail-add.component.css'],
  providers: [UserService, TrailService, EpicService]

})
export class TrailAddComponent implements OnInit {

  public title: string;
  public trailId: string;
  public url: string;
  public status: string;
  public trail: Trail;
  public identity: string;
  public epics = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trailService: TrailService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Adicionar Temas';
    this.url = GLOBAL.url;
    this._bsLocaleService.use('pt-br');
  }

  ngOnInit() {
    console.log('[OK] Component: trail-add.');
    this.identity = this._userService.getIdentity();
    this.trail = new Trail('', '', '', '', '', null, new Date(), new Date());
    this.trail.epic = new Epic('', '', '', '', '', null, new Date(), new Date());
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
      this._trailService.addTrail(this.trail).subscribe(
          response => {
              if (!response.trail) {
                  this.status = 'error';
              } else {
                  this.status = 'success';
                  this._router.navigate(['/admin/trail/edit', response.trail._id]);
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
