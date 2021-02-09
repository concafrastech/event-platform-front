import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infancia-circo-concafrinhas',
  templateUrl: './infancia-circo-concafrinhas.component.html',
  styleUrls: ['./infancia-circo-concafrinhas.component.css']
})
export class InfanciaCircoConcafrinhasComponent implements OnInit {

  private eventOpeningBegins = new Date('02/12/2021 19:00:00 GMT-0300').toLocaleString();
  private eventOpeningEnds = new Date('02/12/2021 19:30:00 GMT-0300').toLocaleString();

  private eventEndingBegins = new Date('02/14/2021 16:00:00 GMT-0300').toLocaleString();
  private eventEndingEnds = new Date('02/14/2021 17:00:00 GMT-0300').toLocaleString();

  private muralBegins = new Date('02/13/2021 11:30:00 GMT-0300').toLocaleString();
  public allowMural = false;

  private allOpenedBegins = new Date('02/13/2021 18:30:00 GMT-0300').toLocaleString();
  private allOpenedEnds = new Date('02/14/2021 16:00:00 GMT-0300').toLocaleString();

  private now = new Date().toLocaleString();
  private simul = new Date('02/13/2021 11:40:00 GMT-0300').toLocaleString();


  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModalOpening(template: TemplateRef<any>) {
    if (this.now >= this.eventOpeningBegins && this.now <= this.eventOpeningEnds) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      alert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }

  openModalEnding(template: TemplateRef<any>) {

    if (this.now >= this.eventEndingBegins && this.now <= this.eventEndingEnds) {
      if (this.modalRef) {
        this.modalRef.hide();
      }
      this.modalRef = this.modalService.show(template);
    }
    else {
      this.openAlert("Atividade fechada! Por favor, retorne para atividade da programação do evento.");
    }
  }
  
  openAlert(message:string) {
    alert(message);
  }

  verifyMuralTime() {
    if (this.now >= this.muralBegins) {
      this.allowMural = true;
    }
  }

  ngOnInit() {
    this.verifyMuralTime();
  }
}
