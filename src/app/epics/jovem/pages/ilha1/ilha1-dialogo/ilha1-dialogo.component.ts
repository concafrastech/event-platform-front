import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-ilha1-dialogo',
  templateUrl: './ilha1-dialogo.component.html',
  styleUrls: ['./ilha1-dialogo.component.css']
})
export class Ilha1DialogoComponent implements OnInit {

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
    getUrl()
  {
    return "url(/assets/jovem/img/bribrioteca.png)";
  }

}
