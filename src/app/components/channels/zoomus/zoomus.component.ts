import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-zoomus',
  templateUrl: './zoomus.component.html',
  styleUrls: ['./zoomus.component.css']
})
export class ZoomusComponent implements OnInit {

  @Input() public vContent: Content;
  sourceUrl: string = '';

  constructor() {

  }

  ngOnInit() {
    this.sourceUrl = GLOBAL.zoomUrl + "/" + this.vContent._id
  }

}