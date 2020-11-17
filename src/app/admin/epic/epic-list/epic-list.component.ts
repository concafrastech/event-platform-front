import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Epic} from '../../../models/epic';
import {EpicService} from '../../../services/epic.service';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'app-epic-list',
  templateUrl: './epic-list.component.html',
  styleUrls: ['./epic-list.component.css'],
  providers: [UserService, EpicService]
})
export class EpicListComponent implements OnInit {
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public epics: Epic[];
  public follows;
  public follow_me;
  public status: string;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _epicService: EpicService,
      private _userService: UserService
  ) {
      this.title = 'Lista de Épicos';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: epics.');
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
          
          this.getEpics(page);
      });
  }

  getEpics(page) {
      this._epicService.getEpics(page).subscribe(
          response => {
              if (!response.epics) {
                  this.status = 'error';
              } else {
                  this.total = response.total;
                  this.epics = response.epics;
                  this.pages = response.pages;
                  if (page > this.pages) {
                      this._router.navigate(['/listepic', 1]);
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
