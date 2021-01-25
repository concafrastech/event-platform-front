import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-infancia-brincadeiras',
  templateUrl: './infancia-brincadeiras.component.html',
  styleUrls: ['./infancia-brincadeiras.component.css']
})
export class InfanciaBrincadeirasComponent implements OnInit {
  title: string;
  closeBtnName: string;
  list: any[] = [];

  constructor(public bsModalRef: BsModalRef) { }

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }
}
