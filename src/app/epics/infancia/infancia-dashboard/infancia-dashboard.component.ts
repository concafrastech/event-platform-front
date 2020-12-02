import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infancia-dashboard',
  templateUrl: './infancia-dashboard.component.html',
  styleUrls: ['./infancia-dashboard.component.css']
})
export class InfanciaDashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('epic', 'jovem');
  }

}
