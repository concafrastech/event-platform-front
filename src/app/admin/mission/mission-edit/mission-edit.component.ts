import { ActivityService } from "src/app/services/activity.service";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Mission } from "src/app/models/mission";
import { EpicService } from "src/app/services/epic.service";
import { MissionService } from "src/app/services/mission.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { Activity } from "src/app/models/activity";

@Component({
  selector: "app-mission-edit",
  templateUrl: "./mission-edit.component.html",
  styleUrls: ["./mission-edit.component.css"],
  providers: [UserService, MissionService, EpicService, ActivityService],
})
export class MissionEditComponent implements OnInit {
  public title: string;
  public missionId: string;
  public url: string;
  public status: string;
  public mission: Mission;
  public identity: string;
  public epics = [];
  public activities: Activity[] = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _missionService: MissionService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _activityService: ActivityService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Missão";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: mission-edit.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.mission = new Mission("", 0, null, "", "", 0, 0, new Date(), new Date());
    this.mission.epic = null; // new Epic('', '', '', '', '', '', null, new Date(), new Date());
    this.loadPage();
  }

  loadPage() {
    this._activityService.getActivities().subscribe(
      (response) => {
        this._spinner.hide();
        this.activities = response.activities;
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this.epics = response.epics;
          this._route.params.subscribe((params) => {
            this.missionId = params["id"];
            this.getMission(this.missionId);
          });
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  getMission(id) {
    this._missionService.getMission(id).subscribe(
      (response) => {
        if (response.mission) {
          this._spinner.hide();
          this.mission = response.mission;
        } else {
          this._spinner.hide();
          this.status = "error";
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
        this._router.navigate(["/editmission", this.missionId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  trackByFn(index, item) {
    return index;
  }

  onSubmit() {
    this._spinner.show();
    this._missionService
      .updateMission(this.mission)
      .subscribe(
        (response) => {
          if (!response.mission) {
            this._spinner.hide();
            this.status = "error";
          } else {
            this._spinner.hide();
            this.status = "success";
            this.getMission(this.missionId);
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
