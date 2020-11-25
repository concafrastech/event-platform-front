import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService, UserService]
})
export class UserListComponent implements OnInit {
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public users: User[];
  public follows;
  public follow_me;
  public status: string;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService
  ) {
      this.title = 'Lista de Usuários';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: users.');
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
          
          this.getUsers(page);
      });
  }

  getUsers(page) {
      this._userService.getUsers(page).subscribe(
          response => {
              if (!response.users) {
                  this.status = 'error';
              } else {
                  this.total = response.total;
                  this.users = response.users;
                  this.pages = response.pages;
                  if (page > this.pages) {
                      this._router.navigate(['/admin/user/list', 1]);
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
