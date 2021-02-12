import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { Location } from "@angular/common";

@Component({
  selector: 'app-user-welcome',
  templateUrl: './user-welcome.component.html',
  styleUrls: ['./user-welcome.component.css']
})
export class UserWelcomeComponent implements OnInit {

  public actualContent: Content;

  constructor(private location: Location, private _router: Router) {}

  ngOnInit(): void {
    this.actualContent = this.temporaryContent("https://youtu.be/R_r-7L4yVKw");
  }

  back() {
    this.location.back();
  }

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

  private temporaryContent(url: string) {
    return new Content(
      null,
      null,
      0,
      null,
      null,
      true,
      true,
      url,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null,
      null
    );
  }

}
