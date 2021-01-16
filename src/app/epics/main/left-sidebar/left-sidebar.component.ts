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
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.css'],
  providers: [ UserService ]
})
export class LeftSidebarComponent implements OnInit {

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

    console.log(this.user);
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
    console.log('gamification: ', this._gamificationService);

    this._gamificationService.addBreakpoint(100, () => {
      console.log('breakpoint 100 callback: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
    });
    this._gamificationService.addBreakpoint(200, () => {
      console.log('breakpoint 200 callback: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
    });
    this._gamificationService.addBreakpoint(300, () => {
      console.log('breakpoint 300 callback: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
    });
    this._gamificationService.addBreakpoint(400, () => {
      console.log('breakpoint 400 callback: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Parabéns você está em novo nível!", "alert-success"));
    });

    let component = this._gamificationService.addComponent(400, () => {
      console.info('component update callback');
      let points = this._gamificationService.getPoints();
      this._gamificationService.getLevelByPoints(points);
      this.user.points = points;
      this.user.level = this._gamificationService.getLevel();
      this.progress.value = points;
    }, () => {
      console.log('component 400 start callback');
      this.progress.max = 3000;
      this.user.level = this._gamificationService.getLevel();
    });


    this._gamificationService.addMission('add', 50, '', () => {
      console.log('add mission start');
    }, () => {
      console.log('add mission achieve: ', this._gamificationService.getPoints());
    });
    
    this._gamificationService.addMission('timeline', 10, '', () => {
      console.log('add mission start');
    }, () => {
      console.log('add mission achieve: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Você ganhou 10 pontos por acessar Timeline!", "alert-success"));
    });
    
    this._gamificationService.addMission('pessoas', 10, '', () => {
      console.log('add mission start');
    }, () => {
      console.log('add mission achieve: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Você ganhou 10 pontos por acessar Pessoas!", "alert-success"));
    });

    this._gamificationService.addMission('mensagens', 10, '', () => {
      console.log('add mission start');
    }, () => {
      console.log('add mission achieve: ', this._gamificationService.getPoints());
      this._bootstrapAlertService.alert(new NgBootstrapAlert("Você ganhou 10 pontos por acessar Mensagens!", "alert-success"));
    });

    this._gamificationService.addMission('save', 30, '', () => {
      console.log('save mission start');
    }, () => {
      console.log('save mission achieve: ', this._gamificationService.getPoints());
    });

    this._gamificationService.addMission('delete', 10, '', () => {
      console.log('delete mission start');
    }, () => {
      console.log('delete mission achieve: ', this._gamificationService.getPoints());
    });

    console.log(this.user.level);
    console.log(this.identity);

  }

  openProgramacaoComponent() {
    const initialState = {
      title: 'Programação'
    };
    this.bsModalRef = this._modalService.show(ScheduleComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Fechar';
  }

}