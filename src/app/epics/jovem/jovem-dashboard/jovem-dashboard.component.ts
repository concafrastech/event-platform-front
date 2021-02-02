  import { DocumentService } from "src/app/services/document.service";
  import { MagneticPassDistanceComponent } from 'src/app/epics/main/magnetic-pass-distance/magnetic-pass-distance.component';
  import { Component, OnInit } from '@angular/core';
  import { Router } from '@angular/router';
  import { GamificationService } from 'angular-gamification';
  import { NgBootstrapAlert, NgBootstrapAlertService } from 'ng-bootstrap-alert';
  import { UserService } from 'src/app/services/user.service';
  import { 
    faHeart,
    faLifeRing,
    faQuestionCircle,
    faUserCircle
  } from '@fortawesome/free-regular-svg-icons';
  import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
  import { ScheduleComponent } from 'src/app/components/schedule/schedule.component';
  import { FraternalSupportComponent } from "src/app/epics/main/fraternal-support/fraternal-support.component";
  import { TawkService } from "src/app/services/tawk-service";
  import { Location } from '@angular/common';
  import { NavbarService } from "src/app/services/navbar.service";

  
  @Component({
    selector: 'app-jovem-dashboard',
    templateUrl: './jovem-dashboard.component.html',
    styleUrls: ['./jovem-dashboard.component.css'],
    providers: [UserService, DocumentService, TawkService, NavbarService]
  })
  export class JovemDashboardComponent implements OnInit {
  
    public identity;
    public user;
    public progress;
    public bsModalRef: BsModalRef;
    public showChat: boolean = false;
  
    public faUserCircle = faUserCircle;
  
    constructor(
      private _router: Router,
      private _userService: UserService,
      public _gamificationService: GamificationService,
      public _bootstrapAlertService: NgBootstrapAlertService,
      private _modalService: BsModalService,
      private _documentService: DocumentService,
      private location: Location,
      public _navbarService: NavbarService
    ) { 

      this.progress = {
          max: 0,
          value: 0
      };
      this.user = this._userService.getIdentity();
      this.initGamefication();
  
    }
  
    ngOnInit(): void {
      this.identity = this._userService.getIdentity();
    
      this._documentService
      .getDocument(this.user.image)
      .subscribe((response) => {
        this.user.image = response.document;
      });
    }
  
    logout() {
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/login']);
    }
    
    initGamefication() {
  
      console.log("gamification: ", this._gamificationService);

      this._gamificationService.addBreakpoint(100, () => {
        console.log(
          "breakpoint 100 callback: ",
          this._gamificationService.getPoints()
        );
        this._bootstrapAlertService.alert(
          new NgBootstrapAlert(
            "Parabéns você está em novo nível!",
            "alert-success"
          )
        );
      });
      this._gamificationService.addBreakpoint(200, () => {
        console.log(
          "breakpoint 200 callback: ",
          this._gamificationService.getPoints()
        );
        this._bootstrapAlertService.alert(
          new NgBootstrapAlert(
            "Parabéns você está em novo nível!",
            "alert-success"
          )
        );
      });
      this._gamificationService.addBreakpoint(300, () => {
        console.log(
          "breakpoint 300 callback: ",
          this._gamificationService.getPoints()
        );
        this._bootstrapAlertService.alert(
          new NgBootstrapAlert(
            "Parabéns você está em novo nível!",
            "alert-success"
          )
        );
      });
      this._gamificationService.addBreakpoint(400, () => {
        console.log(
          "breakpoint 400 callback: ",
          this._gamificationService.getPoints()
        );
        this._bootstrapAlertService.alert(
          new NgBootstrapAlert(
            "Parabéns você está em novo nível!",
            "alert-success"
          )
        );
      });
  
      let component = this._gamificationService.addComponent(
        400,
        () => {
          console.info("component update callback");
          let points = this._gamificationService.getPoints();
          this._gamificationService.getLevelByPoints(points);
          this.user.points = points;
          this.user.level = this._gamificationService.getLevel();
          this.progress.value = points;
        },
        () => {
          console.log("component 400 start callback");
          this.progress.max = 3000;
          this.user.level = this._gamificationService.getLevel();
        }
      );
  
      this._gamificationService.addMission(
        "add",
        50,
        "",
        () => {
          console.log("add mission start");
        },
        () => {
          console.log(
            "add mission achieve: ",
            this._gamificationService.getPoints()
          );
        }
      );
  
      this._gamificationService.addMission(
        "timeline",
        10,
        "",
        () => {
          console.log("add mission start");
        },
        () => {
          console.log(
            "add mission achieve: ",
            this._gamificationService.getPoints()
          );
          this._bootstrapAlertService.alert(
            new NgBootstrapAlert(
              "Você ganhou 10 pontos por acessar Timeline!",
              "alert-success"
            )
          );
        }
      );
  
      this._gamificationService.addMission(
        "pessoas",
        10,
        "",
        () => {
          console.log("add mission start");
        },
        () => {
          console.log(
            "add mission achieve: ",
            this._gamificationService.getPoints()
          );
          this._bootstrapAlertService.alert(
            new NgBootstrapAlert(
              "Você ganhou 10 pontos por acessar Pessoas!",
              "alert-success"
            )
          );
        }
      );
  
      this._gamificationService.addMission(
        "mensagens",
        10,
        "",
        () => {
          console.log("add mission start");
        },
        () => {
          console.log(
            "add mission achieve: ",
            this._gamificationService.getPoints()
          );
          this._bootstrapAlertService.alert(
            new NgBootstrapAlert(
              "Você ganhou 10 pontos por acessar Mensagens!",
              "alert-success"
            )
          );
        }
      );
  
      this._gamificationService.addMission(
        "save",
        30,
        "",
        () => {
          console.log("save mission start");
        },
        () => {
          console.log(
            "save mission achieve: ",
            this._gamificationService.getPoints()
          );
        }
      );
  
      this._gamificationService.addMission(
        "delete",
        10,
        "",
        () => {
          console.log("delete mission start");
        },
        () => {
          console.log(
            "delete mission achieve: ",
            this._gamificationService.getPoints()
          );
        }
      );
  
      console.log(this.user.level);
      console.log(this.identity);
  
    }
  
    openProgramacaoComponent() {
      const initialState = {
        title: "Programação",
      };
      this.bsModalRef = this._modalService.show(ScheduleComponent, {
        initialState,
        class: "modal-lg",
      });
      this.bsModalRef.content.closeBtnName = "Fechar";
    }
  
  
    openMagneticPassDistanceComponent(){
      const initialState = {
        title: "O passe pode ser dado à distância?",
      };
      this.bsModalRef = this._modalService.show(MagneticPassDistanceComponent, {
        initialState,
        class: "modal-lg",
      });
      this.bsModalRef.content.closeBtnName = "Fechar";
    }

    openFraternalSupportComponent() {
      const initialState = {
        title: "Apoio Fraterno?",
      };
      this.bsModalRef = this._modalService.show(FraternalSupportComponent, {
        initialState,
        class: "modal-lg",
      });
      this.bsModalRef.content.closeBtnName = "Fechar";
    }
  
    openCloseFraternalSupportChat() {
      this.showChat = !this.showChat;
      //this._tawkService.ExpandChatWindow(true);
    }

    back() {
      this.location.back();
    }

    sidebarCollapse() {
      // transferir para aqui o collapse da side bar
    }

  }

/* Verificar se esta função pode ir para dentro do export */
$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active_jovem");
    $(this).toggleClass("active_jovem");
  });
});


