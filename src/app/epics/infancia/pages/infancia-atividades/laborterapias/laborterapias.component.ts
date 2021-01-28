import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-laborterapias',
  templateUrl: './laborterapias.component.html',
  styleUrls: ['./laborterapias.component.css']
})
export class LaborterapiasComponent {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }

}
