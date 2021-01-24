import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-brincadeiras',
  templateUrl: './brincadeiras.component.html',
  styleUrls: ['./brincadeiras.component.css']
})
export class BrincadeirasComponent {

  @Input() public id: string;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService, 
    private _route: ActivatedRoute,
  ) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
    // this.idVideo = id;
  }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let id = params['id'];
      this.id = id;
    });
  }
}
