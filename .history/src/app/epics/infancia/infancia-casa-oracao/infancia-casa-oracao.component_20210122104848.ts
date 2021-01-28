import { Component, TemplateRef  } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import { YoutubeComponent } from './../../../components/channels/youtube/youtube.component';

@Component({
  selector: 'app-infancia-casa-oracao',
  templateUrl: './infancia-casa-oracao.component.html',
  styleUrls: ['./infancia-casa-oracao.component.css']
})
export class InfanciaCasaOracaoComponent {

  modalRef: BsModalRef;
  // linkvideo: string;
  

  constructor(private modalService: BsModalService) { }

  // openModal(template: TemplateRef<any>, linkvideo: string) {
  openModal(template: TemplateRef<any>) {
    if (this.modalRef) {
      this.modalRef.hide();
    }
    this.modalRef = this.modalService.show(template);
    // this.linkvideo = linkvideo;
  }

}
