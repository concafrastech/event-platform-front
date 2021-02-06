import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Epic } from "src/app/models/epic";
import { Mission } from "src/app/models/mission";
import { EpicService } from "src/app/services/epic.service";
import { MissionService } from "src/app/services/mission.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { ActivityService } from "src/app/services/activity.service";
import { Activity } from "src/app/models/activity";

@Component({
  selector: "app-mission-add",
  templateUrl: "./mission-add.component.html",
  styleUrls: ["./mission-add.component.css"],
  providers: [UserService, MissionService, EpicService, ActivityService],
})
export class MissionAddComponent implements OnInit {
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
    this.title = "Adicionar Missão";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: mission-add.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.mission = new Mission("", 0, null, "", "", 0, 0, new Date(), new Date());
    this.mission.epic = null/*new Epic(
      "",
      "",
      "",
      "",
      "",
      "",
      null,
      new Date(),
      new Date()
    );*/
    this.loadPage();
  }

  loadPage() {
    this._epicService.getEpics().subscribe(
      (response) => {
        if (response) {
          this._spinner.hide();
          this.epics = response.epics;
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );

    this._activityService.getActivities().subscribe(
      (response) => {
        this._spinner.hide();
        this.activities = response.activities
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

  trackByFn(index, item) {
    return index;
  }

  onSubmit() {
    this._spinner.show();
    this._missionService.addMission(this.mission).subscribe(
      (response) => {
        if (!response.mission) {
          this._spinner.hide();
          this.status = "error";
        } else {
          this._spinner.hide();
          this.status = "success";
          this._router.navigate(["/admin/mission/edit", response.mission._id]);
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
