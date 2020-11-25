import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Epic } from 'src/app/models/epic';
import { Trail } from "src/app/models/trail";
import { EpicService } from "src/app/services/epic.service";
import { TrailService } from "src/app/services/trail.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-trail-edit",
  templateUrl: "./trail-edit.component.html",
  styleUrls: ["./trail-edit.component.css"],
  providers: [UserService, TrailService, EpicService],
})
export class TrailEditComponent implements OnInit {
  public title: string;
  public trailId: string;
  public url: string;
  public status: string;
  public trail: Trail;
  public identity: string;
  public epics = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _trailService: TrailService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _bsLocaleService: BsLocaleService
  ) {
    this.title = "Editar Épicos";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: trail-edit.");
    this.identity = this._userService.getIdentity();
    this.trail = new Trail('', '', '', '', '', null, new Date(), new Date());
    this.trail.epic = new Epic('', '', '', '', '', null, new Date(), new Date());
    this.loadPage();
  }

  loadPage() {
    this._epicService
      .getEpics()
      .subscribe(
        (response) => {
          if (response) {
            this.epics = response.epics;
            this._route.params.subscribe((params) => {
              this.trailId = params["id"];
              this.getTrail(this.trailId);
            });
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getTrail(id) {
    this._trailService.getTrail(id).subscribe(
      (response) => {
        if (response.trail) {
          this.trail = response.trail;
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/edittrail", this.trailId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this._trailService
      .updateTrail(this.trail)
      .subscribe(
        (response) => {
          if (!response.trail) {
            this.status = "error";
          } else {
            this.status = "success";
            this.getTrail(this.trailId);
          }
        },
        (error) => {
          var errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            this.status = "error";
          }
        }
      );
  }
}