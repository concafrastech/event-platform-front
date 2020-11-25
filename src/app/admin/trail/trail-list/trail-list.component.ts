import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Trail} from '../../../models/trail';
import {TrailService} from '../../../services/trail.service';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-trail-list',
  templateUrl: './trail-list.component.html',
  styleUrls: ['./trail-list.component.css'],
  providers: [UserService, TrailService]
})
export class TrailListComponent implements OnInit {
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
  public trails: Trail[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _trailService: TrailService,
      private _userService: UserService,
      private modalService: BsModalService
  ) {
      this.title = 'Lista de Temas';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: trails.');
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
          this.getTrails(page, this.epicId);
      });
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.actualPage();
  }

  getTrails(page, epicId) {
      this._trailService.getTrails(page, epicId).subscribe(
          response => {
              if (!response.trails) {
                  this.status = 'error';
              } else {
                  this.total = response.total;
                  this.trails = response.trails;
                  this.pages = response.pages;
                  if (this.pages > 1 && page > this.pages) {
                    this._router.navigate(['/admin/trail/list', 1]);
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

  openDeleteConfirm(trail) {
    const initialState = {
      title: 'Excluir Épico',
      message: 'Deseja realmente excluir o épico : ' + trail.name + '? <br> Essa ação não poderá ser desfeita.'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {initialState});
    this.bsModalRef.content.actionBtnName = 'Excluir';
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose.subscribe(
        result => {
            this.deleteTrail(trail._id);
        },
        err => {
            console.log(err);
            this.status = 'error';
        }
    )
  }

  deleteTrail(id){
      console.log(id);
      this._trailService.deleteTrail(id).subscribe(
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
