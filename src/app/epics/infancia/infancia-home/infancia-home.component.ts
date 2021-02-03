import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infancia-home',
  templateUrl: './infancia-home.component.html',
  styleUrls: ['./infancia-home.component.css']
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
  // private now = new Date('02/13/2021 11:30:00 GMT-0300').toLocaleString();
  public accessAllowed = true;
  public portrait = false;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    localStorage.setItem('epic', 'infancia');

    this.verifyEntrance();

    this.verifyPortrait();
  }

  verifyEntrance() {
    if ((this.now >= this.eventOpeningBegins && this.now < this.eventOpeningEnds) || (this.now >= this.TemaCentral_OficinaBegins && this.now < this.TemaCentral_OficinaEnds) || (this.now >= this.TemaEspecificoBegins && this.now < this.TemaEspecificoEnds) || (this.now >= this.eventEndingBegins && this.now < this.eventEndingEnds)) {
      this.accessAllowed = false;
    }
  }

  verifyPortrait() {
    if (window.innerWidth < window.innerHeight) {
      this.portrait = true;
    }
  }

  openAlert() {
    alert('Ambiente fechado! Por favor, retorne para atividade da programação do evento.')
  }

  gotoPrincipal(epic) {
    localStorage.setItem('currentEpic', JSON.stringify(epic));
    localStorage.setItem('epic', null);
    this._router.navigate(['/home']);
  }

}
