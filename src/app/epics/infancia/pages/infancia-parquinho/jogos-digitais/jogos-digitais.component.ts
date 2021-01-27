import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-jogos-digitais',
  templateUrl: './jogos-digitais.component.html',
  styleUrls: ['./jogos-digitais.component.css']
})

export class JogosDigitaisComponent {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

}
