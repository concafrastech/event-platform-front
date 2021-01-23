import { Component, OnInit } from '@angular/core';
import { Stage } from 'src/app/models/stage';

@Component({
  selector: 'app-ndc',
  templateUrl: './ndc.component.html',
  styleUrls: ['./ndc.component.css']
})
export class NdcComponent implements OnInit {

  public stageList: Stage[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
