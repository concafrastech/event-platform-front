import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ilha2-dialogo',
  templateUrl: './ilha2-dialogo.component.html',
  styleUrls: ['./ilha2-dialogo.component.css']
})
export class Ilha2DialogoComponent implements OnInit {

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
