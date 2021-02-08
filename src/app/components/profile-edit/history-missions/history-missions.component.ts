import { MissionService } from "./../../../services/mission.service";
import { UserService } from "./../../../services/user.service";
import { XpsService } from "./../../../services/xps.service";
import { User } from "src/app/models/user";
import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal";
import { Xps } from "src/app/models/xps";

@Component({
  selector: "app-history-missions",
  templateUrl: "./history-missions.component.html",
  styleUrls: ["./history-missions.component.css"],
})
export class HistoryMissionsComponent implements OnInit {
  user: User;
  xpList: Xps[] = [];
  isLoading: boolean;

  constructor(
    private _userService: UserService,
    private _xpsService: XpsService,
    private _missionService: MissionService,
    public bsModalRef: BsModalRef
  ) {}

  ngOnInit(): void {
    this.user = this._userService.getIdentity();
    this.isLoading = true;
    this.loadHistoryMissions();
  }

  //Carrega missões do usuário
  loadHistoryMissions() {
    this._xpsService.getXpByUser(this.user._id).subscribe({
      next: (response) => {
        this.xpList = response.xps;
        this.xpList.map((xp, index) => {
          this._missionService.getMission(xp.mission).subscribe((mission) => {
            this.xpList[index].mission = mission.mission;
          });
        });
      },
      error: null,
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}
