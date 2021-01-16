import {Component, OnInit, DoCheck, ElementRef, Renderer2} from '@angular/core';
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
    selector: 'app-event-clean',
    templateUrl: './event-clean.component.html',
    styleUrls: ['./event-clean.component.css'],
    providers: [UserService]
})
export class EventCleanComponent implements OnInit, DoCheck {
    public title: string;
    public identity;
    public url: string;
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
        public _bootstrapAlertService: NgBootstrapAlertService,
        private _modalService: BsModalService
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
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
        this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    }

    ngDoCheck() {
        this.identity = this._userService.getIdentity();
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
      this.bsModalRef = this._modalService.show(TutorialComponent, {initialState, class: 'modal-lg'});
      this.bsModalRef.content.closeBtnName = 'Próximo';
      this.bsModalRef.onHide.subscribe((e) => {
          localStorage.setItem("tutorial", "true");
      });
    }
}