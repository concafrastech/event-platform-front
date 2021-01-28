import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infancia-roda-alegria',
  templateUrl: './infancia-roda-alegria.component.html',
  styleUrls: ['./infancia-roda-alegria.component.css']
})
export class InfanciaRodaAlegriaComponent {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }
}
