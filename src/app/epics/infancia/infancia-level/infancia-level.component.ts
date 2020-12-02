import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-infancia-level',
  templateUrl: './infancia-level.component.html',
  styleUrls: ['./infancia-level.component.css']
})
export class InfanciaLevelComponent implements OnInit {

  @Input() public level: string;

  constructor(      
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let level = params['level'];
      this.level = level;
    });
  }

}
