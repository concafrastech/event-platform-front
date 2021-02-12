import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Epic } from 'src/app/models/epic';
import { Subscription } from 'src/app/models/subscription';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-infancia-home',
  templateUrl: './infancia-home.component.html',
  styleUrls: ['./infancia-home.component.css'],
  providers: [UserService]
})
export class InfanciaHomeComponent implements OnInit {

  private eventOpeningBegins = new Date('02/12/2021 19:00:00 GMT-0300').toLocaleString();
  private eventOpeningEnds = new Date('02/12/2021 19:30:00 GMT-0300').toLocaleString();

  private TemaCentral_OficinaBegins = new Date('02/13/2021 11:00:00 GMT-0300').toLocaleString();
  private TemaCentral_OficinaEnds = new Date('02/13/2021 12:00:00 GMT-0300').toLocaleString();

  private TemaEspecificoBegins = new Date('02/13/2021 17:00:00 GMT-0300').toLocaleString();
  private TemaEspecificoEnds = new Date('02/13/2021 18:30:00 GMT-0300').toLocaleString();

  private eventEndingBegins = new Date('02/14/2021 16:00:00 GMT-0300').toLocaleString();
  private eventEndingEnds = new Date('02/14/2021 17:00:00 GMT-0300').toLocaleString();

  private now = new Date().toLocaleString();
  public accessAllowed = true;
  public portrait = false;


  screenWidth: number = window.innerWidth;
  screenHeight: number = window.innerHeight;

  public userAge: number;
  public identity;
  public subscription: Subscription;
  public epic: Epic;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
  ) { }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    this.subscription = JSON.parse(localStorage.getItem('currentSubscription'));
    this.epic = JSON.parse(localStorage.getItem('currentEpic'));

    // localStorage.setItem('epic', 'infancia');

    this.verifyEntrance();

    this.verifyPortrait();

    window.addEventListener('orientationchange', (e) => {
      // console.log(e);
      this.portrait = !this.portrait;
      this._router.navigate(['/concafrinhas/home']);
    });
    
    // Calcula a idade do usuário para permitir ou não usar o botão de 'ir para concafras adulto'
    if (this.subscription){
      if (this.subscription.user) {
        this.calculateAge(new Date(this.subscription.user?.birthday));
      }
    }
  }

  verifyEntrance() {
    if ((this.now >= this.eventOpeningBegins && this.now < this.eventOpeningEnds) || (this.now >= this.TemaCentral_OficinaBegins && this.now < this.TemaCentral_OficinaEnds) || (this.now >= this.TemaEspecificoBegins && this.now < this.TemaEspecificoEnds) || (this.now >= this.eventEndingBegins && this.now < this.eventEndingEnds)) {
      this.accessAllowed = false;
    }
  }

  verifyPortrait() {
    if (this.screenWidth < this.screenHeight) {
      this.portrait = true;
    }
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(['/login']);
  }

  openAlert() {
    alert('Ambiente fechado! Por favor, retorne para atividade da programação do evento.')
  }

  gotoPrincipal(epic) {
    if (this.userAge >= 12) {
      localStorage.setItem('currentEpic', JSON.stringify(epic));
      localStorage.setItem('epic', null);
      this._router.navigate(['/home']);
    } else {
      alert('Sem permissão para acessar! Por favor, retorne para as atividades do evento.')
    }
  }

  calculateAge(birthday: Date){
    let ageDifMs = new Date().getTime() - birthday.getTime();
    let ageDate = new Date(ageDifMs);
    this.userAge = Math.abs(ageDate.getUTCFullYear() - 1970);
  }

}

