import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-iframe',
  templateUrl: './iframe.component.html',
  styleUrls: ['./iframe.component.css']
})
export class IframeComponent implements OnInit {

  //@Input() public vContent: Content;
  @Input() public sourceUrl: string;

  constructor() { }

  ngOnInit(): void {
    
  }
}
