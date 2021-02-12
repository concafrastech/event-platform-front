import { Component, OnInit } from '@angular/core';
import { NavbarService } from "src/app/services/navbar.service";

@Component({
  selector: 'app-ilha1',
  templateUrl: './ilha1.component.html',
  styleUrls: ['./ilha1.component.css'],
  providers: [NavbarService]
})
export class Ilha1Component implements OnInit {

  constructor(public _navbarService: NavbarService) { }

  ngOnInit(): void {
    //this._navbarService.setButtonBack(true);
  }

}

