import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ilha1',
  templateUrl: './ilha1.component.html',
  styleUrls: ['./ilha1.component.css']
})
export class Ilha1Component implements OnInit {

  @Input() public dialog: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
    ) { }

  ngOnInit(): void {

  }

}
