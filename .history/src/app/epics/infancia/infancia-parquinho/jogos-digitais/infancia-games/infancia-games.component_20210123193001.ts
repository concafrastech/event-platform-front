import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-infancia-games',
  templateUrl: './infancia-games.component.html',
  styleUrls: ['./infancia-games.component.css']
})
export class InfanciaGamesComponent implements OnInit {
  @Input() public jogo: string;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,

  ) { }

  ngOnInit(): void {
    this._route.params.subscribe(params => {
      let jogo = params['id'];
      this.jogo = jogo;
    });

  }
}
