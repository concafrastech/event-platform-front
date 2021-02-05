import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "../../../models/subscription";
import { SubscriptionService } from "../../../services/subscription.service";
import { UserService } from "../../../services/user.service";
import { GLOBAL } from "../../../services/global";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeleteConfirmComponent } from "src/app/components/delete-confirm/delete-confirm.component";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-subscription-list",
  templateUrl: "./subscription-list.component.html",
  styleUrls: ["./subscription-list.component.css"],
  providers: [UserService, SubscriptionService],
})
export class SubscriptionListComponent implements OnInit {
  @Input() conferenceId: string = null;
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages: number[] = [];
  public subscriptions: Subscription[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _subscriptionService: SubscriptionService,
    private _userService: UserService,
    private modalService: BsModalService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Lista de Inscrições";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log("[OK] Component: subscriptions.");
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
      this.getSubscriptions(page, this.conferenceId);
    });
  }

  getSubscriptions(page, conferenceId) {
    this._subscriptionService.getSubscriptions(page, conferenceId).subscribe(
      (response) => {
        if (!response.subscriptions) {
          this.status = "error";
          this._spinner.hide();
        } else {
          this._spinner.hide();
          this.total = response.total;
          this.subscriptions = response.subscriptions;
          this.pages = [];
          for (let i = 1; i <= response.pages; i++) {
            this.pages.push(i);
          }

          if (this.pages && page > this.pages.length) {
            this._router.navigate(["/admin/subscription/list", 1]);
          } else {
            this._router.navigate(["/admin/subscription/list", page]);
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

  openDeleteConfirm(subscription) {
    const initialState = {
      title: "Excluir Épico",
      message:
        "Deseja realmente excluir essa Inscrição : " +
        subscription.name +
        "? <br> Essa ação não poderá ser desfeita.",
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.actionBtnName = "Excluir";
    this.bsModalRef.content.closeBtnName = "Cancelar";

    this.bsModalRef.content.onClose.subscribe(
      (result) => {
        this.deleteSubscription(subscription._id);
      },
      (err) => {
        console.log(err);
        this.status = "error";
      }
    );
  }

  deleteSubscription(id) {
    console.log(id);
    this._subscriptionService.deleteSubscription(id).subscribe(
      (response) => {
        console.log(response);
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
