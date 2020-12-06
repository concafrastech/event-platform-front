import {Component, Input, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Stage} from '../../../models/stage';
import { Epic } from '../../../models/epic';
import {StageService} from '../../../services/stage.service';
import {EpicService} from '../../../services/epic.service';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { DeleteConfirmComponent } from 'src/app/components/delete-confirm/delete-confirm.component';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-stage-list',
  templateUrl: './stage-list.component.html',
  styleUrls: ['./stage-list.component.css'],
  providers: [UserService, StageService, EpicService]
})
export class StageListComponent implements OnInit {
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
  public stages: Stage[];
  public epics: Epic[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
      private _route: ActivatedRoute,
      private _router: Router,
      private _stageService: StageService,
      private _epicService: EpicService,
      private _userService: UserService,
      private modalService: BsModalService,
      private _spinner: NgxSpinnerService
  ) {
      this.title = 'Lista de Trilhas';
      this.url = GLOBAL.url;
      this.identity = this._userService.getIdentity();
      this.token = this._userService.getToken();

  }

  ngOnInit() {
      console.log('[OK] Component: stages.');
      this._spinner.show();
      this.loadEpics();
      this.actualPage();
  }

  loadEpics() {
    this._epicService
      .getEpics()
      .subscribe(
        (response) => {
          if (response) {
            this.epics = response.epics;
            this._spinner.hide();
          }
        },
        (error) => {
          console.log(<any>error);
          this._spinner.hide();
        }
      );
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
          this.getStages(page, this.epicId);
      });
  }

  epicChanged(event: any): void {
      this.epicId = event;
      this.actualPage();
  }

  pageChanged(event: any): void {
    this.page = event.page;
    this.actualPage();
  }

  getStages(page, epicId) {
      this._stageService.getStages(page, epicId).subscribe(
          response => {
              if (!response.stages) {
                  this._spinner.hide();
                  this.status = 'error';
              } else {
                  this._spinner.hide();
                  this.total = response.total;
                  this.stages = response.stages;
                  this.pages = response.pages;
                  if (this.pages > 1 && page > this.pages) {
                    this._router.navigate(['/admin/stage/list', 1]);
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

  openDeleteConfirm(stage) {
    const initialState = {
      title: 'Excluir Trilha',
      message: 'Deseja realmente excluir o trilha : ' + stage.name + '? <br> Essa ação não poderá ser desfeita.'
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {initialState});
    this.bsModalRef.content.actionBtnName = 'Excluir';
    this.bsModalRef.content.closeBtnName = 'Cancelar';

    this.bsModalRef.content.onClose.subscribe(
        (result) => {
            if(result){
                this.deleteStage(stage._id);
            }
        },
        (err) => {
            console.log(err);
            this.status = 'error';
        }
    )
  }

  deleteStage(id){
      console.log(id);
      this._stageService.deleteStage(id).subscribe(
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
