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
  }

}
