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
$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
    $(this).toggleClass("active");
  });
});


