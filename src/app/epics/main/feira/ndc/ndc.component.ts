import { Activity } from "./../../../../models/activity";
import { StageService } from "./../../../../services/stage.service";
import { Component, OnInit } from "@angular/core";
import { Stage } from "src/app/models/stage";
import { UserService } from "src/app/services/user.service";
import { NavbarService } from "src/app/services/navbar.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-ndc",
  templateUrl: "./ndc.component.html",
  styleUrls: ["./ndc.component.css"],
  providers: [StageService, UserService],
})
export class NdcComponent implements OnInit {
  public stageList: Stage[] = [];
  public activityList: Activity[] = [];

  constructor(
    private _router: Router,
    private _stageService: StageService,
    public _navbarService: NavbarService,
    private _userService: UserService
  ) {}

  ngOnInit(): void {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));
    this._stageService.getFullStages(null, epic._id).subscribe((response) => {
      this.stageList = response.stages;
    });
    this._navbarService.setButtonBack(true);
  }

  showActivities(item: Stage) {
    this._router.navigate(["/ndc-activities"], {queryParams: {id: item._id}});
  }

  ngOnDestroy(): void {
    this._navbarService.setButtonBack(false);
  }
}
