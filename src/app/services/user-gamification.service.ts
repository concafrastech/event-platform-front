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
    this.loadGamification();
  }

  loadGamification() {
    //loadMissionsByEpic
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
    // console.log("missions do épico: ");
    // console.log({missions: missions});

    let user = JSON.parse(localStorage.getItem("identity"));
    this._xpsService.getXpByUser(user._id).subscribe({
      next: (response) => {
        console.log(response);
        
        //this._xpsService.getXpByUser(user._id).subscribe((response)=>{

        let xps = response.xps;
        // console.log(xps);
        
        if (xps && xps.length > 0) {
          // console.log("usuário COM missões completadas");
          xps.map((xp) => {
            let missionXp = xp.mission;
            let points = 0;
            let index = missions.findIndex((mission, i) => {
              if (mission._id == missionXp) {
                points += mission.amount;
                return true;
              }
            });
            if (index != -1) {
              this._gamificationService.addPoints(points);
              missions.splice(index, 1);
              this.setupBreakPoints();
              this.checkLevel();
            }
          });
        }else{
          // console.log("usuário SEM missões completadas");
          this.setupBreakPoints();
        }
      },
      error: null,
      complete: () => {
        missions.map((mission, index) => {
          this._gamificationService.addMission(
            mission.name,
            mission.amount,
            mission.description,
            () => {
              // console.log("Mission start: " + mission.name);
            },
            () => {
              // console.log("Mission complete: " + mission.name);
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
    this._gamificationService.breakpoints = []
    this._gamificationService.levels.map((level, index) => {
      if (index > 0 && level.range.max > this.getPoints()) {
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
