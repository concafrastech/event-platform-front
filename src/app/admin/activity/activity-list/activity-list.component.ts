import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Activity} from '../../../models/activity';
import {ActivityService} from '../../../services/activity.service';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.css'],
  providers: [UserService, ActivityService]
})
export class ActivityListComponent implements OnInit {
  @Input() epicId: string = null;
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages;
  public activitys: Activity[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _activityService: ActivityService,
      private _userService: UserService,
      private modalService: BsModalService
  ) {
      this.title = 'Lista de Paineis';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: activitys.');
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
          this.getActivitys(page, this.epicId);
      });
  }

  getActivitys(page, epicId) {
      this._activityService.getActivitys(page, epicId).subscribe(
          response => {
              if (!response.activitys) {
                  this.status = 'error';
              } else {
                  this.total = response.total;
                  this.activitys = response.activitys;
                  this.pages = response.pages;
                  if (this.pages > 1 && page > this.pages) {
                      this._router.navigate(['/admin/activity/list', 1]);
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

  openDeleteConfirm(activity) {
    const initialState = {
      title: 'Excluir Palestra',
      message: 'Deseja realmente excluir esse painel : ' + activity.name + '? <br> Essa ação não poderá ser desfeita.'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {initialState});
    this.bsModalRef.content.actionBtnName = 'Excluir';
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose.subscribe(
        result => {
            if(result) {
                this.deleteActivity(activity._id);
            }
        },
        err => {
            console.log(err);
            this.status = 'error';
        }
    )
  }

  deleteActivity(id){
      console.log(id);
      this._activityService.deleteActivity(id).subscribe(
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
