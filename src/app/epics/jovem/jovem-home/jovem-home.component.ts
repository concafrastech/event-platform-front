import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { TutorialComponent } from 'src/app/components/tutorial/tutorial.component';
import { WelcomeComponent } from 'src/app/components/welcome/welcome.component';
import { Epic } from 'src/app/models/epic';
import { Subscription } from 'src/app/models/subscription';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-jovem-home',
  templateUrl: './jovem-home.component.html',
  styleUrls: ['./jovem-home.component.css'],
  providers: [UserService]
})
export class JovemHomeComponent implements OnInit, AfterViewInit {
  public title: string;
    public identity;
    public subscription: Subscription;
    public epic: Epic;
    bsModalRef: BsModalRef;
    bsModalRef2: BsModalRef;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private modalService: BsModalService
    ) {
        this.title = 'Bem Vindos!';
    }

  ngOnInit() {
    // console.log('[OK] Component: home.');
    // console.log('event-platform-concafras App Version: 0.2.0');

    // Como pegar usuário logado
    this.identity = this._userService.getIdentity();
    // Como pegar inscrição atual, a partir dela dá para pegar a trail, e a conference, e o user
    this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    // Como pegar o epico atual
    this.epic = JSON.parse(localStorage.getItem('currentEpic'));
  }

  ngAfterViewInit(){
    var epic = localStorage.getItem("epic");
    if(epic == null){
        var welcome = localStorage.getItem("welcome");
        if(this.identity && !this.identity.firstlogin){
            if( welcome != "true" ){ 
                this.openWelcomeComponent();
            } else {
                var tutorial = localStorage.getItem("tutorial");
                if(tutorial != "true") {
                    this.openTutorialComponent();
                }
            }
        }
    }
  }

  onSubmit() {
  }

  openWelcomeComponent() {
      const initialState = {
        title: 'Seja bem vindo'
      };
      this.bsModalRef = this.modalService.show(WelcomeComponent, {initialState, class: 'modal-lg'});
      this.bsModalRef.content.closeBtnName = 'Próximo';
      this.bsModalRef.onHide.subscribe((e) => {
          localStorage.setItem("welcome", "true");
          this.openTutorialComponent();
      });
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
      this.bsModalRef2 = this.modalService.show(TutorialComponent, {initialState, class: 'modal-lg'});
      this.bsModalRef2.content.closeBtnName = 'Próximo';
      this.bsModalRef2.onHide.subscribe((e) => {
          localStorage.setItem("tutorial", "true");
      });
  }

// Ir para plataforma adultos, herdado de select-journey.component.ts
  gotoPrincipal(epic){
    localStorage.setItem('currentEpic', JSON.stringify(epic));
    localStorage.setItem('epic', null);
    this._router.navigate(['/home']);
  }

}



// reativar a função abaixo para mudar o fundo conforme o horário 
/*
    var thedate   = new Date();
    var hourofday = thedate.getUTCHours();

    if ((hourofday > 6)&&(hourofday < 18)) {
      document.getElementById("sky-background").className = "day-background";
      document.getElementById("sky-ball").className = "sun";
    }
    else {
      document.getElementById("sky-background").className = "night-background";
      document.getElementById("sky-ball").className = "moon";
    }*/
