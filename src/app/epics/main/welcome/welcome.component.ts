import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Content } from 'src/app/models/content';
import { Location } from "@angular/common";

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  public actualContent: Content;

  constructor(private location: Location, private _router: Router) { }

  ngOnInit(): void {
    this.actualContent = this.temporaryContent(
      "https://youtu.be/R_r-7L4yVKw"
    );
  }

  back() {
    this.location.back();
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
      null
    );
  }

}
