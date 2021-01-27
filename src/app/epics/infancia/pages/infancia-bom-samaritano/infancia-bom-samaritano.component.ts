import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infancia-bom-samaritano',
  templateUrl: './infancia-bom-samaritano.component.html',
  styleUrls: ['./infancia-bom-samaritano.component.css']
})

export class InfanciaBomSamaritanoComponent {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
