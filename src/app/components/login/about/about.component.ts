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
    this._router.navigate(["/hub"]);
  }

  back() {
    this.location.back();
  }
}
