import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-book-club',
  templateUrl: './book-club.component.html',
  styleUrls: ['./book-club.component.css']
})
export class BookClubComponent implements OnInit {

  public title: string;
  public urlZoom: string = "https://us02web.zoom.us/s/83822992319?pwd=U3RMTmMxK09pMlZMaGFBR0FRR01Pdz09"

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit(): void {
  }

}
