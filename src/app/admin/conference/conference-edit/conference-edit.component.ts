import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Conference } from 'src/app/models/conference';
import { ConferenceService } from 'src/app/services/conference.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = 'Editar Evento';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log('[OK] Component: conference-edit.');
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.conference = new Conference(null,'',false, '','',new Date(), new Date(),false,'',false,'', false, false, false, false, false, new Date(), new Date());
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
      this._conferenceService.getConference(id).subscribe(
          response => {
              if (response.conference) {
                  this._spinner.hide();
                  let conference = response.conference;
                  conference.start_date = new Date(conference.start_date);
                  conference.end_date = new Date(conference.end_date);
                  this.conference = conference;
              } else {
                  this._spinner.hide();
                  this.status = 'error';
              }
          },
          error => {
              this._spinner.hide();
              console.log(<any>error);
              this._router.navigate(['/admin/conference/edit', this.conferenceId]);
          }
      );
  }

  onSubmit() {
      this._spinner.show();
      this._conferenceService.updateConference(this.conference).subscribe(
          response => {
              if (!response.conference) {
                  this._spinner.hide();
                  this.status = 'error';
              } else {
                  this._spinner.hide();
                  this.status = 'success';
                  this._router.navigate(['/admin/conference/list']);
              }
          },
          error => {
              this._spinner.hide();
              var errorMessage = <any> error;
              console.log(errorMessage);
              if (errorMessage != null) {
                  this.status = 'error';
              }
          }
      );
  }

}
