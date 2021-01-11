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
  getUrl()
  {
    return "url(/assets/jovem/img/fundo.jpg)";
  }
  

}
$(document).ready(function() {
  $("#sidebarCollapse").on("click", function() {
    $("#sidebar").toggleClass("active");
    $(this).toggleClass("active");
  });
});


