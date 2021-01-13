import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ilha4-dialogo',
  templateUrl: './ilha4-dialogo.component.html',
  styleUrls: ['./ilha4-dialogo.component.css']
})
export class Ilha4DialogoComponent implements OnInit {

  @Input() public dialog: string;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router
  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let dialog = params['dialog'];
      this.dialog = dialog;
    });
  }


}
