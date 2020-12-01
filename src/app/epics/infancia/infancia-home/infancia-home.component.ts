import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infancia-home',
  templateUrl: './infancia-home.component.html',
  styleUrls: ['./infancia-home.component.css']
})
export class InfanciaHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('epic', 'infancia');
  }

}
