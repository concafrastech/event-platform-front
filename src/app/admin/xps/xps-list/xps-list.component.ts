import { concat } from "rxjs";
import { concatMap, map } from "rxjs/operators";
import { MissionService } from "./../../../services/mission.service";
import { XpsService } from "./../../../services/xps.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { NgxSpinnerService } from "ngx-spinner";
import { DeleteConfirmComponent } from "src/app/components/delete-confirm/delete-confirm.component";
import { Xps } from "src/app/models/xps";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { Observable } from "rxjs/Observable";

@Component({
  selector: "app-xps-list",
  templateUrl: "./xps-list.component.html",
  styleUrls: ["./xps-list.component.css"],
})
export class XpsListComponent implements OnInit {
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages: number[] = [];
  public xps: Xps[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _xpsService: XpsService,
    private _userService: UserService,
    private _missionService: MissionService,
    private modalService: BsModalService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Lista de Xps";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log("[OK] Component: xps.");
    this._spinner.show();
    this.actualPage();
  }

  actualPage() {
    this._route.params.subscribe((params) => {
      let page = +params["page"];
      this.page = page;

      if (!params["page"]) {
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
      this.getXps(page);
    });
  }

  getXps(page) {
    this._xpsService.getXps(page).subscribe(
      (response) => {
        this._spinner.hide();

        if (!response.xps) {
          this.status = "error";
        } else {
          this.total = response.total;
          this.xps = response.xps;
          this.pages = [];
          for (let i = 1; i <= response.pages; i++) {
            this.pages.push(i);
          }

          this.xps.forEach((item) => {
            this.loadUserAndMission(item).subscribe({
              next: null,
              error: null,
              complete: () => {
              },
            });
          });

          if (this.pages && page > this.pages.length) {
            this._router.navigate(["/admin/xps/list", 1]);
          } else {
            this._router.navigate(["/admin/xps/list", page]);
          }
        }
      },
      (error) => {
        this._spinner.hide();
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }

  loadUserAndMission(xp: Xps) {
    let obs$: Observable<any>[] = [];
    if (xp.user) {
      obs$.push(
        this._userService.getUser(xp.user).pipe(
          map((response) => {
            xp.user = response.user;
          })
        )
      );
    }
    if (xp.mission) {
      obs$.push(
        this._missionService.getMission(xp.mission).pipe(
          map((response) => {
            xp.mission = response.mission;
          })
        )
      );
    }
    return concat(obs$).pipe(
      concatMap((observableContent) => {
        return observableContent;
      })
    );
  }

  canDeleteXps(xps: Xps) {
    this.openDeleteConfirm(xps);
  }

  openDeleteConfirm(xps: Xps) {
    const initialState = {
      title: "Excluir Xp",
      message:
        "Deseja realmente excluir a xp : " +
        xps._id +
        "? <br> Essa ação não poderá ser desfeita.",
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.actionBtnName = "Excluir";
    this.bsModalRef.content.closeBtnName = "Cancelar";

    this.bsModalRef.content.onClose.subscribe(
      (result) => {
        if (result) {
          this.deleteXps(xps._id);
        }
      },
      (err) => {
        console.log(err);
        this.status = "error";
      }
    );
  }

  deleteXps(id) {
    this._xpsService.deleteXp(id).subscribe(
      (response) => {
        this.actualPage();
      },
      (error) => {
        var errorMessage = <any>error;
        console.log(errorMessage);

        if (errorMessage != null) {
          this.status = "error";
        }
      }
    );
  }
}
