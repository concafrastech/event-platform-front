import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-maternal',
  templateUrl: './maternal.component.html',
  styleUrls: ['./maternal.component.css']
})
export class MaternalComponent implements OnInit {


  private TemaCentralBegins = new Date('02/13/2021 11:00:00 GMT-0300').toLocaleString();
  private TemaCentralEnds = new Date('02/13/2021 11:30:00 GMT-0300').toLocaleString();

  private OficinaArteBegins = new Date('02/13/2021 11:30:00 GMT-0300').toLocaleString();
  private OficinaArteEnds = new Date('02/13/2021 12:00:00 GMT-0300').toLocaleString();

  private TemaEspecificoBegins = new Date('02/13/2021 17:00:00 GMT-0300').toLocaleString();
  private TemaEspecificoEnds = new Date('02/13/2021 17:30:00 GMT-0300').toLocaleString();

  private TemaEspecificoSalaVitualBegins = new Date('02/13/2021 17:30:00 GMT-0300').toLocaleString();
  private TemaEspecificoSalaVitualEnds = new Date('02/13/2021 18:30:00 GMT-0300').toLocaleString();
  public allowSalaVirtual = false;

  private AfterAtvBegins = new Date('02/13/2021 12:00:00 GMT-0300').toLocaleString();
  private AfterAtvEnds = new Date('02/13/2021 17:00:00 GMT-0300').toLocaleString();

  private allOpenedBegins = new Date('02/13/2021 18:30:00 GMT-0300').toLocaleString();
  private allOpenedEnds = new Date('02/14/2021 16:00:00 GMT-0300').toLocaleString();

  private now = new Date().toLocaleString();
  private simul = new Date('02/14/2021 11:40:00 GMT-0300').toLocaleString();

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModalTemaCentral(template: TemplateRef<any>) {
    if ((this.now >= this.TemaCentralBegins && this.now < this.TemaCentralEnds) || (this.now >= this.allOpenedBegins && this.now < this.allOpenedEnds) || (this.now >= this.AfterAtvBegins && this.now < this.AfterAtvEnds)) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openModalTemaEspecifico(template: TemplateRef<any>) {
    if ((this.now >= this.TemaEspecificoBegins && this.now < this.TemaEspecificoEnds) || (this.now >= this.allOpenedBegins && this.now < this.allOpenedEnds) || (this.now >= this.AfterAtvBegins && this.now < this.AfterAtvEnds)) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openModalOficinaArte(template: TemplateRef<any>) {
    if ((this.now >= this.OficinaArteBegins && this.now < this.OficinaArteEnds) || (this.now >= this.allOpenedBegins && this.now < this.allOpenedEnds) || (this.now >= this.AfterAtvBegins && this.now < this.AfterAtvEnds)) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openAlert() {
    alert("Sala Virtual fechada! Por favor, aguarde até 17:30 conforme a programação do evento.");
  }

  verifyAllowSalaVirtual() {
    if (this.now >= this.TemaEspecificoSalaVitualBegins && this.now < this.TemaEspecificoSalaVitualEnds) {
      this.allowSalaVirtual = true;
    }
  }

  ngOnInit() {
    this.verifyAllowSalaVirtual();
  }
}
