import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { NgxSpinnerService } from "ngx-spinner";
import { Mission } from "src/app/models/mission";
import { User } from "src/app/models/user";
import { Xps } from "src/app/models/xps";
import { GLOBAL } from "src/app/services/global";
import { MissionService } from "src/app/services/mission.service";
import { UserService } from "src/app/services/user.service";
import { XpsService } from "src/app/services/xps.service";

@Component({
  selector: "app-xps-edit",
  templateUrl: "./xps-edit.component.html",
  styleUrls: ["./xps-edit.component.css"],
})
export class XpsEditComponent implements OnInit {
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
    this.title = "Editar Xps";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: xps-edit.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();

    this.xps = new Xps("", 0, null, null);
    this.loadPage();
  }

  loadPage() {
    this._route.params.subscribe((params) => {
      this.xpsId = params["id"];
      this._xpsService.getXp(this.xpsId).subscribe((response) => {
        this.xps = response.xp;
        this._userService.getUser(this.xps.user).subscribe((response) => {
          this.userXp = response.user;
        });
        this._missionService
          .getMission(this.xps.mission)
          .subscribe((response) => {
            this.missionXp = response.mission;
          });
        this._spinner.hide();
      });
    });

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
    console.log(this.xps);
    
    this.updateXp();
  }

  //Salva Xp
  updateXp() {
    this._xpsService.updateXp(this.xps).subscribe(
      (response) => {
        this._spinner.hide();
        if (!response.xp) {
          this.status = "error";
        } else {
          this.status = "success";
          this._router.navigate(["/admin/xps/edit", response.xps._id]);
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
