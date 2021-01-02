import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jovem-dashboard',
  templateUrl: './jovem-dashboard.component.html',
  styleUrls: ['./jovem-dashboard.component.css']
})
export class JovemDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

	$(document).ready(function () {
		console.log("document is ready");
		$('[data-toggle="offcanvas"], #navToggle').on('click', function () {
			$('.offcanvas-collapse').toggleClass('open')
		})
	});
	window.onload = function () {
		console.log("window is loaded");
	};