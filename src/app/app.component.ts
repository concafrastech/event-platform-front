import { UserGamificationService } from "src/app/services/user-gamification.service";
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
  /*
  initJivoChat(){
    const tag = this.renderer.createElement("script");
    this.renderer.setProperty(tag, 'id', "jivo_chat_id_angular")
    this.renderer.setProperty(tag, 'src', "//code.jivosite.com/widget/rVCwKR4Pul")
    //this.renderer.(tag, 'jivo_onLoadCallback', ()=>{console.log('oi')})
    this.jivoChat = new ElementRef(tag);
    this.jivoChat.nativeElement.addEventListener('jivo_onLoadCallback', (event)=>{
      console.log("oi")
      console.log(event)
    })
    this.renderer.appendChild(document.body, tag);
  }

  closeJivoChat(){
    //Recupera referências ao JivoChat
    const tag = <HTMLScriptElement>this.jivoChat.nativeElement;
    const divJivo = document.getElementsByTagName('jdiv')[0];
    const iframeJivo = document.getElementById('jivo-iframe-container');

    //Remove Jivo
    divJivo.parentNode.removeChild(divJivo);
    iframeJivo.remove();
    tag.remove();

    this.jivoChat = null;
  }*/

  newInterval() {
    this.interval = setInterval(() => {
      console.log(
        "%c PONTUANDO APÓS UMA HORA DO USÁRIO LOGADO",
        "font-size: 15px; color: orange"
      );
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
        this.dailyMission();
      }
    }
  }

  dailyMission() {
    let now = new Date();
    if (now.getDate() == 12) {
      setTimeout(() => {
        this._userGamificationService.setMissionComplete("Bônus Sexta");
      }, 3000);
    }

    if (now.getDate() == 13) {
      setTimeout(() => {
        this._userGamificationService.setMissionComplete("Bônus Sábado");
      }, 3000);
    }

    if (now.getDate() == 14) {
      setTimeout(() => {
        this._userGamificationService.setMissionComplete("Bônus Domingo");
      }, 3000);
    }
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}
