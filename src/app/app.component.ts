import { UserGamificationService } from 'src/app/services/user-gamification.service';
import { Subscription } from "rxjs";
import { Component, OnInit, DoCheck } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { UserService } from "./services/user.service";
import { GLOBAL } from "./services/global";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: [UserService],
})
export class AppComponent implements OnInit, DoCheck {
  public title: string;
  public identity;
  public url: string;
  public tawkId = "5f918320b5546b2d39909b27";
  public interval: any;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _userGamificationService: UserGamificationService
  ) {
    this.title = "EVENTO";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  newInterval() {
    this.interval = setInterval(() => {
      console.log("%c PONTUANDO APÓS UMA HORA DO USÁRIO LOGADO", 'font-size: 15px; color: orange');
      this._userGamificationService.setMissionComplete("Bônus Hora");
    }, 3600000);
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
    if (this.identity == null) {
      clearInterval(this.interval);
      this.interval = null;
    } else {
      if (this.interval == null) {
        this.newInterval();
      }
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
