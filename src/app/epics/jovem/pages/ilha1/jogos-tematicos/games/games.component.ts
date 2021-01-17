import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-games',
	templateUrl: './games.component.html',
	styleUrls: ['./games.component.css']
})
export class GamesComponent implements OnInit {
	@Input() public jogo: string;


	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		
		) { }

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			let jogo = params['jogo'];
			this.jogo = jogo;
		});

	}

}
