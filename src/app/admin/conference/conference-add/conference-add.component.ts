import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { Conference } from 'src/app/models/conference';
import { ConferenceService } from 'src/app/services/conference.service';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';
import { NgxSpinnerService } from "ngx-spinner";

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
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = 'Adicionar Evento';
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.conference = new Conference(null,'',false, '', '',new Date(), new Date(),false,'',false,'', false, false, false, false, false,new Date(), new Date());
  }

  onSubmit() {
    this._spinner.show();
      this._conferenceService.addConference(this.conference).subscribe(
          response => {
              if (!response.conference) {
                  this._spinner.hide();
                  this.status = 'error';
              } else {
                  this._spinner.hide();
                  this.status = 'success';
                  this._router.navigate(['/admin/conference/edit', response.conference._id]);
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
