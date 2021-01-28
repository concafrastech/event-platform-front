import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-jogos-tematicos',
	templateUrl: './jogos-tematicos.component.html',
	styleUrls: ['./jogos-tematicos.component.css']
})
export class JogosTematicosComponent implements OnInit {

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

