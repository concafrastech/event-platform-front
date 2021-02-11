import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';
import { NgxSpinnerService } from "ngx-spinner";
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm.component';
import { ConfirmComponent } from 'src/app/components/confirm/confirm.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
  providers: [UserService, UserService]
})
export class UserListComponent implements OnInit {
  public title: string;
  public url: string;
  public search: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages: number[] = [];
  public users: User[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _userService: UserService,
      private modalService: BsModalService,
      private _spinner: NgxSpinnerService
  ) {
      this.title = 'Lista de Usuários';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: users.');
      this._spinner.show();
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

  searchUsers(){
      this.getUsers(this.page, this.search);
  }

  getUsers(page, search = null) {
      this._userService.getUsers(page, search).subscribe(
          response => {
              if (!response.users) {
                  this.status = 'error';
                  this._spinner.hide();
              } else {
                  this._spinner.hide();
                  this.total = response.total;
                  this.users = response.users;
                  this.pages = [];
                  for (let i = 1; i <= response.pages; i++) {
                    this.pages.push(i);
                  }
                  
                  if (this.pages && page > this.pages.length) {
                    this._router.navigate(["/admin/user/list", 1]);
                  } else {
                    this._router.navigate(["/admin/user/list", page]);
                  }
              }
          },
          error => {
              this._spinner.hide();
              var errorMessage = <any>error;
              console.log(errorMessage);

              if (errorMessage != null) {
                  this.status = 'error';
              }
          }
      );
  }

  canDeleteUser(user: User) {
      this.errorDeleteModal();
  }

  errorDeleteModal() {
    const initialState = {
      title: "Não é possível excluir usuário!",
      message: "Operação não permitida.",
    };
    this.bsModalRef = this.modalService.show(ConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.actionBtnName = "OK";
  }
}
