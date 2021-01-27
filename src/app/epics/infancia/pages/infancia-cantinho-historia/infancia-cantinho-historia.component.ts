import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infancia-cantinho-historia',
  templateUrl: './infancia-cantinho-historia.component.html',
  styleUrls: ['./infancia-cantinho-historia.component.css']
})
export class InfanciaCantinhoHistoriaComponent {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
