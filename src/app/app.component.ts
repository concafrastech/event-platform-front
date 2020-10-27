import {Component, OnInit, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from './services/user.service';
import {GLOBAL} from './services/global';
import * as $ from 'jquery';
import { GamificationService } from 'angular-gamification';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    providers: [UserService]
})
export class AppComponent implements OnInit, DoCheck {
    public title: string;
    public identity;
    public url: string;
    public user;
    public progress;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        public _gamificationService: GamificationService
    ) {
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
    }

    ngDoCheck() {
        this.identity = this._userService.getIdentity();
    }

    logout() {
        localStorage.clear();
        this.identity = null;
        this._router.navigate(['/']);
    }

    initGamefication() {
        console.log('gamification: ', this._gamificationService);

        this._gamificationService.addBreakpoint(100, () => {
          console.log('breakpoint 100 callback: ', this._gamificationService.getPoints());
        });
        this._gamificationService.addBreakpoint(200, () => {
          console.log('breakpoint 200 callback: ', this._gamificationService.getPoints());
        });
        this._gamificationService.addBreakpoint(300, () => {
          console.log('breakpoint 300 callback: ', this._gamificationService.getPoints());
        });
        this._gamificationService.addBreakpoint(400, () => {
          console.log('breakpoint 400 callback: ', this._gamificationService.getPoints());
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
        });

        this._gamificationService.addMission('pessoas', 10, '', () => {
          console.log('add mission start');
        }, () => {
          console.log('add mission achieve: ', this._gamificationService.getPoints());
        });

        this._gamificationService.addMission('mensagens', 10, '', () => {
          console.log('add mission start');
        }, () => {
          console.log('add mission achieve: ', this._gamificationService.getPoints());
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
}
