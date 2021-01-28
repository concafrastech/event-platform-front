import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-brincadeiras',
  templateUrl: './brincadeiras.component.html',
  styleUrls: ['./brincadeiras.component.css']
})
export class BrincadeirasComponent {
  
  modalRef: BsModalRef;
  // idVideo: string;
  // linkvideo: string;
  

  constructor(private modalService: BsModalService) { }

  // openModal(template: TemplateRef<any>, linkvideo: string) {
  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
    // this.idVideo = id;
  }
}
