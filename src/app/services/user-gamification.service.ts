import { Xps } from "./../models/xps";
import { MissionService } from "./mission.service";
import { Mission } from "src/app/models/mission";
import { Injectable } from "@angular/core";
import { GamificationService } from "angular-gamification";
import { NgBootstrapAlert, NgBootstrapAlertService } from "ng-bootstrap-alert";
import { XpsService } from "./xps.service";
import { User } from "../models/user";

@Injectable({
  providedIn: "root",
})
export class UserGamificationService {
  constructor(
    private _bootstrapAlertService: NgBootstrapAlertService,
    private _gamificationService: GamificationService,
    private _missionService: MissionService,
    private _xpsService: XpsService
  ) {
    this.setupBreakPoints();
    this.loadMissionsByEpic();
  }

  loadMissionsByEpic() {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));

    if (epic) {
      this._missionService.getMissions(null, epic._id).subscribe((response) => {
        this.setupEpicMissions(response.missions);
      });
    }
  }

  setMissionComplete(mission: string) {
    this._gamificationService.achieveMission(mission);
  }

  getPoints() {
    return this._gamificationService.getPoints();
  }

  getLevel() {
    return this.checkLevel();
  }

  private setupEpicMissions(missions: Mission[]) {
    console.log(missions);

    let user = JSON.parse(localStorage.getItem("identity"));
    this._xpsService.getXps().subscribe({
      next: (response) => {
        //this._xpsService.getXpByUser(user._id).subscribe((response)=>{
        console.log(response);

        let missionXp = response.xps[0].mission;
        let points = 0;
        console.log(missionXp);
        
        let index = missions.findIndex((mission, i) => {
          if (mission._id == missionXp) {
            points += mission.amount;
            return true;
          }
        });
        console.log(index);
        
        if(index != -1){
        missions.splice(index);
        console.log(points);
        this._gamificationService.addPoints(points);
        this.checkLevel();
      }
      },
      error: null,
      complete: () => {
        
        console.log("oi");
        
        missions.map((mission, index) => {
          this._gamificationService.addMission(
            mission.name,
            mission.amount,
            mission.description,
            () => {
              console.log("Mission start: " + mission.name);
            },
            () => {
              console.log("Mission complete: " + mission.name);
              this.removeMissionAchieved(mission);
              this.saveMissionUser(mission);
              this.checkLevel();
            }
          );
        });
      },
    });
  }

  private checkLevel() {
    this._gamificationService.setLevel(
      this._gamificationService.getLevelByPoints(this.getPoints())
    );
    return this._gamificationService.getLevel();
  }

  private setupBreakPoints() {
    this._gamificationService.levels.map((level, index) => {
      if (index > 0) {
        this._gamificationService.addBreakpoint(level.range.min, () => {
          this._bootstrapAlertService.alert(
            new NgBootstrapAlert(
              `Parabéns você subiu para o nível ${level.badge}!`,
              "alert-success"
            )
          );
        });
      }
    });
  }

  private removeMissionAchieved(missionAchieved) {
    let arrayMissions = this._gamificationService.missions;
    let index = arrayMissions.findIndex((mission, i) => {
      if (mission.name == missionAchieved.name) {
        return true;
      }
    });
    arrayMissions.splice(index);
    this._gamificationService.missions = arrayMissions;
  }

  private saveMissionUser(mission: Mission) {
    let user = JSON.parse(localStorage.getItem("identity"));
    this._xpsService.addXp(new Xps("", user, mission)).subscribe();
  }
}
