import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

// import { YoutubeComponent } from './../../../components/channels/youtube/youtube.component';

@Component({
  selector: 'app-infancia-casa-oracao',
  templateUrl: './infancia-casa-oracao.component.html',
  styleUrls: ['./infancia-casa-oracao.component.css']
})
export class InfanciaCasaOracaoComponent {

  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }

}
