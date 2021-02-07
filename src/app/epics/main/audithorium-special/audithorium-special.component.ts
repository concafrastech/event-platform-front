import { DocumentService } from './../../../services/document.service';
import { ContentService } from "./../../../services/content.service";
import { Component, OnInit } from "@angular/core";
import { Content } from "src/app/models/content";
import { NavbarService } from "src/app/services/navbar.service";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-audithorium-special",
  templateUrl: "./audithorium-special.component.html",
  styleUrls: ["./audithorium-special.component.css"],
  providers: [ContentService, DocumentService],
})
export class AudithoriumSpecialComponent implements OnInit {
  public title: string;
  public pageTarget: string;
  public description: string;
  public typeAudithorium: string;
  public contentWorkshopId: any;
  public actualContent: Content;

  constructor(
    private _route: ActivatedRoute,
    private _navbarService: NavbarService,
    private _contentService: ContentService
  ) {}

  ngOnInit(): void {
    this._route.params.subscribe((params) => {
      this.typeAudithorium = params["type"];
      this.contentWorkshopId = params["contentId"];
      this.loadAudithorium();
    });

    this._navbarService.setButtonBack(true);
  }

  loadAudithorium() {
    switch (this.typeAudithorium) {
      case "cfas":
        this.title = "Campanha de Fraternidade Auta de Souza";
        this.pageTarget = "https://forms.gle/5VfA4iy2nk7EHjk36";
        this.actualContent = this.temporaryContent(
          "https://youtu.be/zBDt4QWO3qU"
        );
        break;

      case "cecx":
        this.title = "Campanha de Esclarecimento Chico Xavier";
        this.pageTarget = "https://forms.gle/2RPsHWcfDistBuFX8";
        break;

      case "clube":
        this.title = "Clube do Livro Espírita";
        this.pageTarget = "https://forms.gle/ztEy9xRVLKCiBA6Z6";
        this.actualContent = this.temporaryContent(
          "https://youtu.be/gjmqitynnm4"
        );
        break;

      case "editora":
        this.title = "Editora Auta de Souza";
        this.pageTarget = "https://forms.gle/QPFkjtDedsrnen5A9";
        this.actualContent = this.temporaryContent(
          "https://youtu.be/JT-r5vuLwjA"
        );
        break;

      case "workshop":
        this._route.queryParams.subscribe((params) => {
          this.title = params.name;
          this.description = params.description;
          this.pageTarget = "#";
          this._contentService
            .getContent(this.contentWorkshopId)
            .subscribe((response) => {
              this.actualContent = response.content;
            });
        });

        break;
    }
  }

  private temporaryContent(url: string) {
    return new Content(
      null,
      null,
      0,
      null,
      null,
      null,
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
