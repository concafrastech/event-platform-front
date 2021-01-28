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
  
  @Component({
    selector: 'app-jovem-dashboard',
    templateUrl: './jovem-dashboard.component.html',
    styleUrls: ['./jovem-dashboard.component.css'],
    providers: [UserService]
  })
  export class JovemDashboardComponent implements OnInit {
  
    public identity;
    public user;
    public progress;
    public bsModalRef: BsModalRef;
  
    public faUserCircle = faUserCircle;
  
    constructor(
      private _router: Router,
      private _userService: UserService,
      public _gamificationService: GamificationService,
      public _bootstrapAlertService: NgBootstrapAlertService,
      private _modalService: BsModalService
    ) { 
      this.user = {
        name: 'Gui',
        points: 0,
        level: {}
      };
      this.progress = {
          max: 0,
          value: 0
      };
      this.initGamefication();
  
    }
  
    ngOnInit(): void {
      this.identity = this._userService.getIdentity();
    }
  
    logout() {
      localStorage.clear();
      this.identity = null;
      this._router.navigate(['/login']);
    }
    
    initGamefication() {
  
      this._gamificationService.addBreakpoint(100, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
      });
      this._gamificationService.addBreakpoint(200, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
      });
      this._gamificationService.addBreakpoint(300, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
      });
      this._gamificationService.addBreakpoint(400, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
      });
  
      let component = this._gamificationService.addComponent(400, () => {
        let points = this._gamificationService.getPoints();
        this._gamificationService.getLevelByPoints(points);
        this.user.points = points;
        this.user.level = this._gamificationService.getLevel();
        this.progress.value = points;
      }, () => {
        this.progress.max = 3000;
        this.user.level = this._gamificationService.getLevel();
      });
  
  
      this._gamificationService.addMission('add', 50, '', () => {
      }, () => {
      });
      
      this._gamificationService.addMission('timeline', 10, '', () => {
      }, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Você ganhou 10 pontos por acessar Timeline!", "alert-success"));
      });
      
      this._gamificationService.addMission('pessoas', 10, '', () => {
      }, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Você ganhou 10 pontos por acessar Pessoas!", "alert-success"));
      });
  
      this._gamificationService.addMission('mensagens', 10, '', () => {
      }, () => {
        this._bootstrapAlertService.alert(new NgBootstrapAlert("Você ganhou 10 pontos por acessar Mensagens!", "alert-success"));
      });
  
      this._gamificationService.addMission('save', 30, '', () => {
      }, () => {
      });
  
      this._gamificationService.addMission('delete', 10, '', () => {
      }, () => {
      });
  
    }
  
    openProgramacaoComponent() {
      const initialState = {
        title: 'Programação'
      };
      this.bsModalRef = this._modalService.show(ScheduleComponent, {initialState, class: 'modal-lg'});
      this.bsModalRef.content.closeBtnName = 'Fechar';
    }
  
  
    openMagneticPassDistanceComponent(){
      const initialState = {
        title: 'O passe pode ser dado à distância?'
      };
      this.bsModalRef = this._modalService.show(MagneticPassDistanceComponent, {initialState, class: 'modal-lg'});
      this.bsModalRef.content.closeBtnName = 'Fechar';
    }
  }

/* Verificar se esta função pode ir para dentro do export */
$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active_jovem");
    $(this).toggleClass("active_jovem");
  });
});


