import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Conference } from "../../../models/conference";
import { ConferenceService } from "../../../services/conference.service";
import { UserService } from "../../../services/user.service";
import { GLOBAL } from "../../../services/global";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeleteConfirmComponent } from "src/app/components/delete-confirm/delete-confirm.component";
import { Subject } from "rxjs";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-conference-list",
  templateUrl: "./conference-list.component.html",
  styleUrls: ["./conference-list.component.css"],
  providers: [UserService, ConferenceService],
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
  public pages: number[] = [];
  public conferences: Conference[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _conferenceService: ConferenceService,
    private _userService: UserService,
    private modalService: BsModalService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Lista de Eventos";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
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

      this.getConferences(page);
    });
  }

  getConferences(page) {
    this._conferenceService.getConferences(page).subscribe(
      (response) => {
        if (!response.conferences) {
          this.status = "error";
          this._spinner.hide();
        } else {
          this._spinner.hide();
          this.total = response.total;
          this.conferences = response.conferences;
          this.pages = [];
          for (let i = 1; i <= response.pages; i++) {
            this.pages.push(i);
          }

          if (this.pages && page > this.pages.length) {
            this._router.navigate(["/admin/conference/list", 1]);
          } else {
            this._router.navigate(["/admin/conference/list", page]);
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

  openDeleteConfirm(conference) {
    const initialState = {
      title: "Excluir Evento",
      message: "Deseja realmente excluir o evento : " + conference.name + "?",
    };
    this.bsModalRef = this.modalService.show(DeleteConfirmComponent, {
      initialState,
    });
    this.bsModalRef.content.actionBtnName = "Excluir";
    this.bsModalRef.content.closeBtnName = "Cancelar";

    this.bsModalRef.content.onClose.subscribe(
      (result) => {
        if (result) {
          this.deleteConference(conference._id);
        }
      },
      (err) => {
        console.log(err);
        this.status = "error";
      }
    );
  }

  deleteConference(id) {
    this._conferenceService.deleteConference(id).subscribe(
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
