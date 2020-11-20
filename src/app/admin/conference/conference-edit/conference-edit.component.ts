import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Conference } from 'src/app/models/conference';
import { ConferenceService } from 'src/app/services/conference.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conference-edit',
  templateUrl: './conference-edit.component.html',
  styleUrls: ['./conference-edit.component.css'],
  providers: [UserService, ConferenceService]

})
export class ConferenceEditComponent implements OnInit {

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
    this.title = 'Editar Evento';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log('[OK] Component: conference-edit.');
    this.identity = this._userService.getIdentity();
    this.conference = new Conference(null,'',new Date(), new Date(),false,'',false,'', false, false, false, false, new Date(), new Date());
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
                  let conference = response.conference;
                  conference.start_date = new Date(conference.start_date);
                  conference.end_date = new Date(conference.end_date);
                  this.conference = conference;

              } else {
                  this.status = 'error';
              }
          },
          error => {
              console.log(<any>error);
              this._router.navigate(['/admin/conference/edit', this.conferenceId]);
          }
      );
  }

  onSubmit() {
      this._conferenceService.updateConference(this._userService.getToken(), this.conference).subscribe(
          response => {
              if (!response.conference) {
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
