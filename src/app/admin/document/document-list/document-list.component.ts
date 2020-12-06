import { Component, Input, OnInit } from "@angular/core";
import { Router, ActivatedRoute, Params } from "@angular/router";
import { Document } from "../../../models/document";
import { DocumentService } from "../../../services/document.service";
import { UserService } from "../../../services/user.service";
import { GLOBAL } from "../../../services/global";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { DeleteConfirmComponent } from "src/app/components/delete-confirm/delete-confirm.component";

@Component({
  selector: "app-document-list",
  templateUrl: "./document-list.component.html",
  styleUrls: ["./document-list.component.css"],
  providers: [UserService, DocumentService],
})
export class DocumentListComponent implements OnInit {
  @Input() trailId: string = null;
  public title: string;
  public url: string;
  public identity;
  public token;
  public page;
  public next_page;
  public prev_page;
  public total;
  public pages: number[] = [];
  public documents: Document[];
  public follows;
  public follow_me;
  public status: string;
  public bsModalRef: BsModalRef;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _documentService: DocumentService,
    private _userService: UserService,
    private modalService: BsModalService
  ) {
    this.title = "Lista de Midia";
    this.url = GLOBAL.url;
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
  }

  ngOnInit() {
    console.log("[OK] Component: documents.");
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

      this.getDocuments(page, this.trailId);
    });
  }

  getDocuments(page, trailId) {
    this._documentService.getDocuments(page, trailId).subscribe(
      (response) => {
        if (!response.documents) {
          this.status = "error";
        } else {
          this.total = response.total;
          this.documents = response.documents;
          this.pages = [];
          for (let i = 1; i <= response.pages; i++) {
            this.pages.push(i);
          }

          if (this.pages && page > this.pages.length) {
            this._router.navigate(["/admin/document/list", 1]);
          } else {
            this._router.navigate(["/admin/document/list", page]);
          }
        }
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

  openDeleteConfirm(document) {
    const initialState = {
      title: "Excluir Palestra",
      message:
        "Deseja realmente excluir o document : " +
        document.description +
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
          this.deleteDocument(document._id);
        }
      },
      (err) => {
        console.log(err);
        this.status = "error";
      }
    );
  }

  deleteDocument(id) {
    this._documentService.deleteDocument(id).subscribe(
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
