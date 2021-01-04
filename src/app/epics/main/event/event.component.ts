import {Component, OnInit, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {GLOBAL} from '../../../services/global';
import * as $ from 'jquery';
import { GamificationService } from 'angular-gamification';
import { NgBootstrapAlert, NgBootstrapAlertService } from 'ng-bootstrap-alert';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TutorialComponent } from 'src/app/components/tutorial/tutorial.component';
import { Subscription } from 'src/app/models/subscription';
import { Conference } from 'src/app/models/conference';
import { Trail } from 'src/app/models/trail';
import { 
  faCalendarAlt,
  faPrayingHands,
  faDoorOpen,
  faHome
} from '@fortawesome/free-solid-svg-icons';

import { 
  faHeart,
  faLifeRing,
  faQuestionCircle,
  faUserCircle
} from '@fortawesome/free-regular-svg-icons';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.css'],
    providers: [UserService]
})
export class EventComponent implements OnInit, DoCheck {
    public title: string;
    public identity;
    public url: string;
    public user;
    public progress;
    public subscription: Subscription;
    bsModalRef: BsModalRef;

    public faCalendarAlt = faCalendarAlt;
    public faPrayingHands = faPrayingHands;
    public faHeart = faHeart;
    public faLifeRing = faLifeRing;
    public faDoorOpen = faDoorOpen;
    public faQuestionCircle = faQuestionCircle;
    public faUserCircle = faUserCircle;
    public faHome = faHome;  
    

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        public _gamificationService: GamificationService,
        public _bootstrapAlertService: NgBootstrapAlertService,
        private modalService: BsModalService
    ) {
      var epic = localStorage.getItem("epic");
        
      if(epic == 'jovem'){
          this._router.navigate(['/jovem/home']);
      }
      if(epic == 'infancia'){
          this._router.navigate(['/concafrinhas/home']);
      }

        this.title = 'EVENTO';
        this.url = GLOBAL.url;
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

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    }

    ngDoCheck() {
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

    openTutorialComponent() {
      const initialState = {
        list: [
          'Open a modal with component',
          'Pass your data',
          'Do something else',
          '...'
        ],
        title: 'Tutorial'
      };
      this.bsModalRef = this.modalService.show(TutorialComponent, {initialState, class: 'modal-lg'});
      this.bsModalRef.content.closeBtnName = 'Próximo';
      this.bsModalRef.onHide.subscribe((e) => {
          localStorage.setItem("tutorial", "true");
      });
    }
}
