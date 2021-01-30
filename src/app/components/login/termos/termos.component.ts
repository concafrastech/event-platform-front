import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";
import { Router } from '@angular/router';

@Component({
  selector: 'app-termos',
  templateUrl: './termos.component.html',
  styleUrls: ['./termos.component.css']
})
export class TermosComponent implements OnInit {

  public check: boolean = false;

  constructor(private location: Location, private _router: Router,) { }

  ngOnInit(): void {
  }

  confirmar(){
    if(this.check){
      this._router.navigate(['/about'])
    }
  }

  back() {
    this.location.back();
  }
}
