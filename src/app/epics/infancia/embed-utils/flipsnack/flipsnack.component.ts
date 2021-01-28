import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { SafePipe } from '../../../../utils/safe.pipe';


@Component({
  selector: 'app-flipsnack',
  templateUrl: './flipsnack.component.html',
  styleUrls: ['./flipsnack.component.css']
})
export class FlipsnackComponent implements OnInit {

  public linkUrl: string;

	constructor(
		private _route: ActivatedRoute,
		private _router: Router,
		) { }

	ngOnInit(): void {
		this._route.params.subscribe(params => {
			let hash: string = params['hash'];

			this.linkUrl = `https://cdn.flipsnack.com/widget/v2/widget.html?hash=${hash}`;
		});
	}

}
