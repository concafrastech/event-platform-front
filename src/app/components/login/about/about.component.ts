import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {
  constructor(private location: Location, private _router: Router) {}

  ngOnInit(): void {}

  goToEvent() {
    let epic = JSON.parse(localStorage.getItem("currentEpic"));

    if (epic.type == "adulto") {
      this._router.navigate(["/hub"]);
    } else if (epic.type == "jovem") {
      this._router.navigate(["/jovem/home"]);
    } else {
      this._router.navigate(["/concafrinhas/home"]);
    }
  }

  back() {
    this.location.back();
  }
}
