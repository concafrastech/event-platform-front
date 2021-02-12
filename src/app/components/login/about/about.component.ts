import { Component, OnInit } from "@angular/core";
import { Location } from "@angular/common";
import { Router } from "@angular/router";
import { Epic } from "src/app/models/epic";
import { Content } from "src/app/models/content";

@Component({
  selector: "app-about",
  templateUrl: "./about.component.html",
  styleUrls: ["./about.component.css"],
})
export class AboutComponent implements OnInit {

  public epic: Epic;

  //Links com vídeos tutoriais
  public urlTutorialCaravanSpace: string = 'https://youtu.be/lmVKkM6TpS4';
  public urlTutorialSupportIcons: string = 'https://youtu.be/3mS7gmJYuMg';
  public urlTutorialHome: string = 'https://youtu.be/xiuwzBQDlp4';
  public urlTutorialProfile: string = 'https://youtu.be/2pq0PweznRg';
  public urlTutorialSchedule: string = 'https://youtu.be/AhhBDRe6Gx0';
  public urlTutorialEpicJovem: string = 'https://youtu.be/Uw2pLoEptSQ';

  //Conteúdos temporários para exibição dos vídeos
  public contentCaravanSpace: Content;
  public contentSupportIcons: Content;
  public contentHome: Content;
  public contentProfile: Content;
  public contentSchedule: Content;
  public contentEpicJovem: Content;

  constructor(private location: Location, private _router: Router) {}

  ngOnInit(): void {
    this.epic = JSON.parse(localStorage.getItem("currentEpic"));

    if (this.epic.type == "adulto") {
      this.contentCaravanSpace = this.temporaryContent('caravan-video', this.urlTutorialCaravanSpace);
      this.contentSupportIcons = this.temporaryContent('support-video', this.urlTutorialSupportIcons);
      this.contentHome = this.temporaryContent('home-video', this.urlTutorialHome);
      this.contentProfile = this.temporaryContent('profile-video', this.urlTutorialProfile);
      this.contentSchedule = this.temporaryContent('schedule-video', this.urlTutorialSchedule);
    } else if (this.epic.type == "jovem") {
      this.contentEpicJovem = this.temporaryContent('jovem-video', this.urlTutorialEpicJovem);
    } else {
    }
  }

  goToEvent() {
    if (this.epic.type == "adulto") {
      this._router.navigate(["/hub"]);
    } else if (this.epic.type == "jovem") {
      this._router.navigate(["/jovem/home"]);
    } else {
      this._router.navigate(["/concafrinhas/home"]);
    }
  }

  back() {
    this.location.back();
  }

  temporaryContent(id: string, url: string) {
    return new Content(
      id,
      null,
      0,
      null,
      null,
      false,
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
