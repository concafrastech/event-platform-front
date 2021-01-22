import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-youtube',
  templateUrl: './youtube.component.html',
  styleUrls: ['./youtube.component.css']
})
export class YoutubeComponent {

  modalRef: BsModalRef;

  linkvideo: string;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>, linkvideo: string) {
    this.modalRef = this.modalService.show(template);
    
    this.linkvideo = linkvideo;
  }

}
