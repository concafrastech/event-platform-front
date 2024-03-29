import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Conference } from "src/app/models/conference";
import { Epic } from "src/app/models/epic";
import { ConferenceService } from "src/app/services/conference.service";
import { EpicService } from "src/app/services/epic.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-epic-add",
  templateUrl: "./epic-add.component.html",
  styleUrls: ["./epic-add.component.css"],
  providers: [UserService, EpicService, ConferenceService],
})
export class EpicAddComponent implements OnInit {
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
    this.title = "Adicionar Épicos";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.epic = new Epic("", "", "", "", "", "", null, new Date(), new Date());
    this.epic.conference = new Conference(
      null,
      "",
      false,
      "",
      "",
      new Date(),
      new Date(),
      false,
      "",
      false,
      "",
      false,
      false,
      false,
      false,
      false,
      new Date(),
      new Date()
    );
    this.loadPage();
  }

  loadPage() {
    this._conferenceService.getConferences().subscribe(
      (response) => {
        if (response) {
          this._spinner.hide();
          this.conferences = response.conferences;
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this._spinner.show();
    this._epicService.addEpic(this.epic).subscribe(
      (response) => {
        if (!response.epic) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this._spinner.hide();
          this.status = "success";
          this._router.navigate(["/admin/epic/edit", response.epic._id]);
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
