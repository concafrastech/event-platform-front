import { InfanciaBrincadeirasComponent } from './infancia-brincadeiras/infancia-brincadeiras.component';
import { Component, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-brincadeiras',
  templateUrl: './brincadeiras.component.html',
  styleUrls: ['./brincadeiras.component.css']
})
export class BrincadeirasComponent {


  bsModalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  // openModal(template: TemplateRef<any>) {
  //   this.bsModalRef = this.modalService.show(template);
  // }

  openModalWithComponent() {
    const initialState = {
      list: [
        'Open a modal with component',
        'Pass your data',
        'Do something else',
        '...'
      ],
      title: 'Modal with component'
    };
    this.bsModalRef = this.modalService.show(InfanciaBrincadeirasComponent, {initialState});
    this.bsModalRef.content.closeBtnName = 'Close';
  }

}
