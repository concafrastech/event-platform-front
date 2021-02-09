import { MissionService } from "./../../../services/mission.service";
import { Mission } from "./../../../models/mission";
import { XpsService } from "./../../../services/xps.service";
import { Xps } from "./../../../models/xps";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxSpinnerService } from "ngx-spinner";
import { UserService } from "src/app/services/user.service";
import { GLOBAL } from "src/app/services/global";
import { User } from "src/app/models/user";

@Component({
  selector: "app-xps-add",
  templateUrl: "./xps-add.component.html",
  styleUrls: ["./xps-add.component.css"],
})
export class XpsAddComponent implements OnInit {
  public title: string;
  public xpsId: string;
  public url: string;
  public status: string;
  public xps: Xps;
  public userXp: User;
  public missionXp: Mission;
  public users: User[] = [];
  public missions: Mission[] = [];
  public identity: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _xpsService: XpsService,
    private _userService: UserService,
    private _missionService: MissionService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Adicionar Xps";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: xps-add.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.userXp = new User(
      "",
      "",
      false,
      "",
      "",
      "",
      "",
      "",
      null,
      "",
      "",
      "",
      "",
      "",
      "",
      null,
      "",
      "",
      null,
      null,
      null,
      null,
      null,
      null
    );
    this.missionXp = new Mission("", null, null, "", "", 0, 0, null, null);
    this.xps = new Xps("", 0, null, null);
    this.loadPage();
  }

  loadPage() {
    this._userService.getUsers().subscribe(
      (response) => {
        if (response) {
          this.users = response.users;
          this._spinner.hide();
        }
      },
      (error) => {
        console.log(<any>error);
      }
    );

    this._missionService.getMissions().subscribe(
      (response) => {
        this.missions = response.missions;
        this._spinner.hide();
      },
      (error) => {
        console.log(<any>error);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this.xps.user = this.userXp;
    this.xps.mission = this.missionXp;
    this._spinner.show();
    this.saveXp();
  }

  //Salva Xp
  saveXp() {
    this._xpsService.addXp(this.xps).subscribe(
      (response) => {
        this._spinner.hide();
        
        if (!response.xp) {
          this.status = "error";
        } else {
          this.status = "success";
          this._router.navigate(["/admin/xps/edit", response.xp._id]);
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
