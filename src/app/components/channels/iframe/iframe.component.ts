import { Component, Input, OnInit } from '@angular/core';
import { Content } from 'src/app/models/content';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {

  @Input() public vContent: Content;

  constructor() { }

  ngOnInit(): void {
  }

}
