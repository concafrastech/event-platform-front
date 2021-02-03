import { MissionService } from "./mission.service";
import { Mission } from "src/app/models/mission";
import { Injectable } from "@angular/core";
import { GamificationService } from "angular-gamification";
import { NgBootstrapAlert, NgBootstrapAlertService } from "ng-bootstrap-alert";

@Injectable({
  providedIn: "root",
})
export class UserGamificationService {
  constructor(
    public _bootstrapAlertService: NgBootstrapAlertService,
    public _gamificationService: GamificationService,
    public _missionService: MissionService
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
    //this._gamificationService.missions = [];

    missions.map((mission, index) => {
      this._gamificationService.addMission(
        mission.name,
        mission.amount*20,
        mission.description,
        () => {
          console.log("Mission start: " + mission.name);
        },
        () => {
          console.log("Mission complete: " + mission.name);
          this.removeMissionAchieved(mission)
          this.checkLevel();
        }
      );
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

  private removeMissionAchieved(missionAchieved){
    let arrayMissions = this._gamificationService.missions;
    let index = arrayMissions.findIndex((mission, i)=>{
      if(mission.name == missionAchieved.name){
        
        return true;
      }
    })
    arrayMissions.splice(index);
    this._gamificationService.missions = arrayMissions;
    
  }
}
