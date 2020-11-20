import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Epic} from '../../../models/epic';
import {EpicService} from '../../../services/epic.service';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm.component';

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
  public bsModalRef: BsModalRef;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _epicService: EpicService,
      private _userService: UserService,
      private modalService: BsModalService
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

  openDeleteConfirm(epic) {
    const initialState = {
      title: 'Excluir Épico',
      message: 'Deseja realmente excluir o épico : ' + epic.name + '? <br> Essa ação não poderá ser desfeita.'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {initialState});
    this.bsModalRef.content.actionBtnName = 'Excluir';
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose.subscribe(
        result => {
            this.deleteEpic(epic._id);
        },
        err => {
            console.log(err);
            this.status = 'error';
        }
    )
  }

  deleteEpic(id){
      console.log(id);
      this._epicService.deleteEpic(this._userService.getToken, id).subscribe(
        response => {
            console.log(response);
            this.actualPage();
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
