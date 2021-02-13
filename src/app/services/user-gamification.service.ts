import { map } from 'rxjs/operators';
import { Xps } from "./../models/xps";
import { MissionService } from "./mission.service";
import { Mission } from "src/app/models/mission";
import { Injectable } from "@angular/core";
import { GamificationService } from "angular-gamification";
import { NgBootstrapAlert, NgBootstrapAlertService } from "ng-bootstrap-alert";
import { XpsService } from "./xps.service";
import { User } from "../models/user";
import { Level } from "angular-gamification/src/interface/level.interface";

@Injectable({
  providedIn: "root",
})
export class UserGamificationService {
  iconsOff: Map<string, string>;

  constructor(
    private _bootstrapAlertService: NgBootstrapAlertService,
    private _gamificationService: GamificationService,
    private _missionService: MissionService,
    private _xpsService: XpsService
  ) {
    console.log("oi");
    
    this.loadGamification();

    //Inicializa badges off
    this.iconsOff = new Map<string, string>();
    this.iconsOff.set(
      "TERRA",
      "assets/concafras2021/concafronas/badges/terra off.svg"
    );
    this.iconsOff.set(
      "MARTE",
      "assets/concafras2021/concafronas/badges/marte off.svg"
    );
    this.iconsOff.set(
      "VENUS",
      "assets/concafras2021/concafronas/badges/venus off.svg"
    );
    this.iconsOff.set(
      "JUPITER",
      "assets/concafras2021/concafronas/badges/jupiter off.svg"
    );
    this.iconsOff.set(
      "SOL",
      "assets/concafras2021/concafronas/badges/sol off.svg"
    );
  }

  //Carrega missões
  loadGamification() {
    this._missionService.getFullMissions().subscribe((response) => {
      this.setupEpicMissions(response.missions);
    });
  }

  //Completa a missão
  setMissionComplete(mission: string) {
    this._gamificationService.achieveMission(mission);
  }

  //Retorna pontos do usuário
  getPoints() {
    return this._gamificationService.getPoints();
  }

  //Retorna level do usuário
  getLevel() {
    return this.checkLevel();
  }

  //Retorna icone off do level
  getIconOffByLevel(level: Level) {
    return this.iconsOff.get(level.badge);
  }

  //Retorna um objeto com todas as informações de níveis do usuário
  getInfoLevel() {
    let currentLevel: Level = this._gamificationService.getLevel();
    let currentPoints: number = this.getPoints();
    let achievedLevels: Level[] = [];
    let notAchievedLevels: Level[] = [];
    this._gamificationService.levels.map((level, index) => {
      //Achieved Level
      if (currentPoints > level.range.max) {
        achievedLevels.push(level);
      } else if (currentPoints < level.range.min) {
        notAchievedLevels.push(level);
      }
    });

    //Coloca level atual como alcançado
    achievedLevels.push(currentLevel);

    //Retorna objeto com todas as informações
    return {
      pointsToNextLevel: this.pointsToLevelUp(),
      nextLevel: this.getNextLevel(),
      achievedLevels: achievedLevels,
      notAchievedLevels: notAchievedLevels,
    };
  }

  //Pontos para o próximo nível se houver
  private pointsToLevelUp(): number {
    let currentLevel = this._gamificationService.getLevel();
    if (currentLevel.badge == "SOL") {
      return 0;
    }
    return currentLevel.range.max + 1 - this.getPoints();
  }

  //Retorna o próximo nível se houver
  private getNextLevel(): Level {
    let currentLevel = this._gamificationService.getLevel();
    if (currentLevel.badge == "SOL") {
      return null;
    }

    return this._gamificationService.getLevelByPoints(
      currentLevel.range.max + 1
    );
  }

  //Recupera missões já realizadas pelo usuário e remove das missões em aberto
  private setupEpicMissions(missions: Mission[]) {
    // console.log("missions do épico: ");
    // console.log({missions: missions});

    let user = JSON.parse(localStorage.getItem("identity"));
    this._xpsService.getXpByUser(user._id).subscribe({
      next: (response) => {
        let xps = response.xps;

        if (xps && xps.length > 0) {
          // console.log("usuário COM missões completadas");
          xps.map((xp) => {
            let missionXp = xp.mission;
            let qtyXp = xp.qty;
            let points = 0;
            let index = missions.findIndex((mission, i) => {
              if (mission._id == missionXp) {
                points += mission.amount * xp.qty;
                return true;
              }
            });
            if (index != -1) {
              this._gamificationService.addPoints(points);
              if(qtyXp >= missions[index].limit){
                missions.splice(index, 1);
              }
              
              this.setupBreakPoints();
              this.checkLevel();
            }
          });
        } else {
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
              this.missionCompleted(mission);
              
            }
          );
        });
      },
    });
  }

  //Missão concluída
  private missionCompleted(mission: Mission){
    this.getQuantity(mission);
    
  }

  //Quantidade
  private getQuantity(mission: Mission){
    let user = JSON.parse(localStorage.getItem("identity"));
    let currentXp: Xps;
    this._xpsService.getXpByUser(user._id).subscribe({next: (response)=>{
      let xps = response.xps;
      currentXp = xps.find((xp)=>{
        if(mission._id == xp.mission){
          return xp;
        }
      });
    }, error: null, complete: ()=>{
      let qtd = 0;
      if(currentXp && currentXp.qty){
        qtd = currentXp.qty;
      }
      qtd += 1;
      
      this.removeMissionAchieved(mission, qtd);
      this.saveMissionUser(mission, qtd, currentXp?._id);
      this.checkLevel();
    }})
  }

  //Atualiza e retorna level
  private checkLevel() {
    this._gamificationService.setLevel(
      this._gamificationService.getLevelByPoints(this.getPoints())
    );
    return this._gamificationService.getLevel();
  }

  //Inicializa alertas de troca de nível
  private setupBreakPoints() {
    this._gamificationService.breakpoints = [];
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

  //Remove missões concluídas
  private removeMissionAchieved(missionAchieved, currentQtd) {
    let arrayMissions = this._gamificationService.missions;
    let index = arrayMissions.findIndex((mission, i) => {
      if (mission.name == missionAchieved.name && missionAchieved.limit == currentQtd) {
        return true;
      }
    });

    if(index != -1){
      arrayMissions.splice(index, 1);
      this._gamificationService.missions = arrayMissions;
    }
  }

  //Salva missão concluída
  private saveMissionUser(mission: Mission, currentQtd, idXp) {
    let user = JSON.parse(localStorage.getItem("identity"));
    if(idXp){
      this._xpsService.updateXp(new Xps(idXp, currentQtd, user, mission)).subscribe();
    }else{
      this._xpsService.addXp(new Xps(idXp, currentQtd, user, mission)).subscribe();
    }
    
  }
}
