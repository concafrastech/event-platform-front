// draggablemodal.component.ts
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

declare var $: any;

@Component({
  selector: 'app-draggablemodal',
  templateUrl: './draggablemodal.component.html',
  styleUrls: ['./draggablemodal.component.scss']
})
export class DraggablemodalComponent implements OnInit {

  constructor(
    // Close Bootstrap Modal
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit() {

    $(document).ready(function () {
      let modalContent: any = $('.modal-content');
      modalContent.draggable({
        handle: '.modal-header',
        revert: false,
        revertDuration: 300
      });
    });

  }

}