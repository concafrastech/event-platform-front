import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Conference } from 'src/app/models/conference';
import { Epic } from "src/app/models/epic";
import { ConferenceService } from "src/app/services/conference.service";
import { EpicService } from "src/app/services/epic.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-epic-edit",
  templateUrl: "./epic-edit.component.html",
  styleUrls: ["./epic-edit.component.css"],
  providers: [UserService, EpicService, ConferenceService],
})
export class EpicEditComponent implements OnInit {
  public title: string;
  public epicId: string;
  public url: string;
  public status: string;
  public epic: Epic;
  public identity: string;
  public conferences = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _epicService: EpicService,
    private _userService: UserService,
    private _conferenceService: ConferenceService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Épicos";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: epic-edit.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.epic = new Epic('', '', '', '', '', '', null, new Date(), new Date());
    this.epic.conference = new Conference(null,'', false, '', '', new Date(), new Date(),false,'',false,'', false, false, false, false, false, new Date(), new Date());
    this.loadPage();
  }

  loadPage() {
    this._conferenceService
      .getConferences()
      .subscribe(
        (response) => {
          if (response) {
            this.conferences = response.conferences;
            this._route.params.subscribe((params) => {
              this.epicId = params["id"];
              this.getEpic(this.epicId);
            });
          }
        },
        (error) => {
          this._spinner.hide();
          console.log(<any>error);
        }
      );
  }

  getEpic(id) {
    this._epicService.getEpic(id).subscribe(
      (response) => {
        if (response.epic) {
          this._spinner.hide();
          this.epic = response.epic;
        } else {
          this._spinner.hide();
          this.status = "error";
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
        this._router.navigate(["/editepic", this.epicId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this._spinner.show();
    this._epicService
      .updateEpic(this.epic)
      .subscribe(
        (response) => {
          if (!response.epic) {
            this._spinner.hide();
            this.status = "error";
          } else {
            this._spinner.hide();
            this.status = "success";
            this.getEpic(this.epicId);
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
}
