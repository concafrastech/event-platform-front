import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-select-journey',
  templateUrl: './select-journey.component.html',
  styleUrls: ['./select-journey.component.css']
})
export class SelectJourneyComponent implements OnInit {

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
  }

  gotoInfancia(){
    localStorage.setItem('epic', 'infancia');
    this._router.navigate(['/concafrinhas/home']);
  }

  gotoJovem(){
    localStorage.setItem('epic', 'jovem');
    this._router.navigate(['/jovem/home']);
  }

  gotoPrincipal(){
    localStorage.setItem('epic', null);
    this._router.navigate(['/home']);
  }

}
