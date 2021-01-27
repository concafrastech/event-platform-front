import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-flipsnack',
  templateUrl: './flipsnack.component.html',
  styleUrls: ['./flipsnack.component.css']
})
export class FlipsnackComponent implements OnInit {

  @Input() public hash: string;
	

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		) { }

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			let hash: string = params['hash'];
			this.hash = hash;
		});
	}

}
