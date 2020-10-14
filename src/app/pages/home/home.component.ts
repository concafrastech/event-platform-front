import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DraggablemodalComponent } from '../../components/draggablemodal/draggablemodal.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pageTitle = 'Events';
  showDialog = false;

  constructor(
    private title: Title,
    private modalService: NgbModal
  ) { }

  ngOnInit() {
    this.title.setTitle(this.pageTitle);
  }

  openModal(){
    const modalRef = this.modalService.open(DraggablemodalComponent, {
       // scrollable: true,
       // windowClass: 'customClass',
       // keyboard: false,
       // backdrop: 'static'
     });
     modalRef.result.then(
         result => {
             console.log(result);
         },
         reason => {}
     );
   }

}
