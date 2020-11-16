import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Conference } from 'src/app/models/conference';
import { ConferenceService } from 'src/app/services/conference.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conference-add',
  templateUrl: './conference-add.component.html',
  styleUrls: ['./conference-add.component.css'],
  providers: [UserService, ConferenceService]

})
export class ConferenceAddComponent implements OnInit {

  public title: string;
  public conferenceId: string;
  public url: string;
  public status: string;
  public conference: Conference;
  public identity: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _conferenceService: ConferenceService,
    private _userService: UserService,
    private _bsLocaleService: BsLocaleService
  ) { 
    this.title = 'Adicionar Evento';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log('[OK] Component: conference-add.');
    this.identity = this._userService.getIdentity();
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe(
        params => {
            this.conferenceId = params['id'];
            this.getConference(this.conferenceId);
        }
    );
  }

  getConference(id) {
      this._conferenceService.getConference(this._userService.getToken(), id).subscribe(
          response => {
              if (response.conference) {
                  this.conference = response.conference;
              } else {
                  this.status = 'error';
              }
          },
          error => {
              console.log(<any>error);
              this._router.navigate(['/editconference', this.conferenceId]);
          }
      );
  }

  onSubmit() {
      this._conferenceService.updateConference(this._userService.getToken(), this.conference).subscribe(
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
