import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Trail } from 'src/app/models/trail';
import { Document } from "src/app/models/document";
import { TrailService } from "src/app/services/trail.service";
import { DocumentService } from "src/app/services/document.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-document-edit",
  templateUrl: "./document-edit.component.html",
  styleUrls: ["./document-edit.component.css"],
  providers: [UserService, DocumentService, TrailService],
})
export class DocumentEditComponent implements OnInit {
  public title: string;
  public documentId: string;
  public url: string;
  public status: string;
  public document: Document;
  public identity: string;
  public trails = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _documentService: DocumentService,
    private _userService: UserService,
    private _trailService: TrailService,
    private _bsLocaleService: BsLocaleService
  ) {
    this.title = "Editar Palestra";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
    this.document = new Document('', 0, '', "", 0, '', '', new Date(), new Date());
  }

  getDocument(id) {
    this._documentService.getDocument(id).subscribe(
      (response) => {
        if (response.document) {
          let document = response.document;
          document.start_time = new Date(document.start_time);
          document.end_time = new Date(document.end_time);
          this.document =document;
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/editdocument", this.documentId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this._documentService
      .updateDocument(this.document)
      .subscribe(
        (response) => {
          if (!response.document) {
            this.status = "error";
          } else {
            this.status = "success";
            this.getDocument(this.documentId);
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
}
