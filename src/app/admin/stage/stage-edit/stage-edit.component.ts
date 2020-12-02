import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Epic } from 'src/app/models/epic';
import { Stage } from "src/app/models/stage";
import { EpicService } from "src/app/services/epic.service";
import { StageService } from "src/app/services/stage.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-stage-edit",
  templateUrl: "./stage-edit.component.html",
  styleUrls: ["./stage-edit.component.css"],
  providers: [UserService, StageService, EpicService],
})
export class StageEditComponent implements OnInit {
  public title: string;
  public stageId: string;
  public url: string;
  public status: string;
  public stage: Stage;
  public identity: string;
  public epics = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _stageService: StageService,
    private _userService: UserService,
    private _epicService: EpicService,
    private _bsLocaleService: BsLocaleService
  ) {
    this.title = "Editar Trilha";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: stage-edit.");
    this.identity = this._userService.getIdentity();
    this.stage = new Stage('', 0, '', '', '', null, new Date(), new Date());
    this.stage.epic = new Epic('', '', '', '', '', null, new Date(), new Date());
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
              this.stageId = params["id"];
              this.getStage(this.stageId);
            });
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getStage(id) {
    this._stageService.getStage(id).subscribe(
      (response) => {
        if (response.stage) {
          this.stage = response.stage;
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/editstage", this.stageId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this._stageService
      .updateStage(this.stage)
      .subscribe(
        (response) => {
          if (!response.stage) {
            this.status = "error";
          } else {
            this.status = "success";
            this.getStage(this.stageId);
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
