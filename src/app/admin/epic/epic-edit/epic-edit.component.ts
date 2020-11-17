import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Epic } from 'src/app/models/epic';
import { EpicService } from 'src/app/services/epic.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-epic-edit',
  templateUrl: './epic-edit.component.html',
  styleUrls: ['./epic-edit.component.css'],
  providers: [UserService, EpicService]

})
export class EpicEditComponent implements OnInit {

  public title: string;
  public epicId: string;
  public url: string;
  public status: string;
  public epic: Epic;
  public identity: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _epicService: EpicService,
    private _userService: UserService,
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Editar Evento';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log('[OK] Component: epic-edit.');
    this.identity = this._userService.getIdentity();
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(
        params => {
            this.epicId = params['id'];
            this.getEpic(this.epicId);
        }
    );
  }

  getEpic(id) {
      this._epicService.getEpic(this._userService.getToken(), id).subscribe(
          response => {
              if (response.epic) {
                  this.epic = response.epic;
              } else {
                  this.status = 'error';
              }
          },
          error => {
              console.log(<any>error);
              this._router.navigate(['/editepic', this.epicId]);
          }
      );
  }

  onSubmit() {
      this._epicService.updateEpic(this._userService.getToken(), this.epic).subscribe(
          response => {
              if (!response.user) {
                  this.status = 'error';
              } else {
                  this.status = 'success';
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
