import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infancia-casa-nvl2',
  templateUrl: './infancia-casa-nvl2.component.html',
  styleUrls: ['./infancia-casa-nvl2.component.css']
})
export class InfanciaCasaNvl2Component {
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
  }

}
