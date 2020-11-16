import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Conference} from '../../../../models/conference';
import {ConferenceService} from '../../../../services/conference.service';
import {UserService} from '../../../../services/user.service';
import {GLOBAL} from '../../../../services/global';

@Component({
  selector: 'app-conference-list',
  templateUrl: './conference-list.component.html',
  styleUrls: ['./conference-list.component.css'],
  providers: [UserService, ConferenceService]
})
export class ConferenceListComponent implements OnInit {
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public conferences: Conference[];
  public follows;
  public follow_me;
  public status: string;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _conferenceService: ConferenceService,
      private _userService: UserService
  ) {
      this.title = 'Lista Eventos';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: conferences.');
      this.actualPage();
  }

  actualPage() {
      this._route.params.subscribe(params => {
          let page = +params['page'];
          this.page = page;
          
          if (!params['page']) {
              page = 1;
          }
          
          if (!page) {
              page = 1;
          } else {
              this.next_page = page + 1;
              this.prev_page = page - 1;
              
              if (this.prev_page <= 0) {
                  this.prev_page = 1;
              }
          }
          
          this.getConferences(page);
      });
  }

  getConferences(page) {
      this._conferenceService.getConferences(page).subscribe(
          response => {
              if (!response.conferences) {
                  this.status = 'error';
              } else {
                  this.total = response.total;
                  this.conferences = response.conferences;
                  this.pages = response.pages;
                  if (page > this.pages) {
                      this._router.navigate(['/listconference', 1]);
                  }
              }
          },
          error => {
              var errorMessage = <any>error;
              console.log(errorMessage);
              
              if (errorMessage != null) {
                  this.status = 'error';
              }
          }
      );
  }
}
