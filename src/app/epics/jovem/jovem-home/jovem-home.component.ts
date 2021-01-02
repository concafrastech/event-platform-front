import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-jovem-home',
  templateUrl: './jovem-home.component.html',
  styleUrls: ['./jovem-home.component.css']
})
export class JovemHomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('epic', 'jovem');

    var thedate   = new Date();
    var hourofday = thedate.getUTCHours();

    if ((hourofday > 6)&&(hourofday < 18)) {
      document.getElementById("sky-background").className = "day-background";
      document.getElementById("sky-ball").className = "sun";
    }
    else {
      document.getElementById("sky-background").className = "night-background";
      document.getElementById("sky-ball").className = "moon";
    }

  }
}