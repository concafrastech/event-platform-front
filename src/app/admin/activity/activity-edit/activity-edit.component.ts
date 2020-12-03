import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Stage } from 'src/app/models/stage';
import { Activity } from "src/app/models/activity";
import { StageService } from "src/app/services/stage.service";
import { ActivityService } from "src/app/services/activity.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";

@Component({
  selector: "app-activity-edit",
  templateUrl: "./activity-edit.component.html",
  styleUrls: ["./activity-edit.component.css"],
  providers: [UserService, ActivityService, StageService],
})
export class ActivityEditComponent implements OnInit {
  public title: string;
  public activityId: string;
  public url: string;
  public status: string;
  public activity: Activity;
  public identity: string;
  public alturaTela: number;
  public stages = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _activityService: ActivityService,
    private _userService: UserService,
    private _stageService: StageService,
    private _bsLocaleService: BsLocaleService
  ) {
    this.title = "Editar Painel";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: activity-edit.");
    this.identity = this._userService.getIdentity();
    this.activity = new Activity('', 0, '', '', '', '', new Date(), new Date(), false, null, [], new Date(), new Date());
    this.activity.stage = new Stage('', 0, '', '', '', null, new Date(), new Date());
    this.loadPage();
    //Adicionado altura da tela apenas para forçar a criação da barra de rolagem, rever css
    this.alturaTela =
      window.innerHeight > 0 ? window.innerHeight : screen.height;
  }

  loadPage() {
    this._stageService
      .getStages()
      .subscribe(
        (response) => {
          if (response) {
            this.stages = response.stages;
            this._route.params.subscribe((params) => {
              this.activityId = params["id"];
              this.getActivity(this.activityId);
            });
          }
        },
        (error) => {
          console.log(<any>error);
        }
      );
  }

  getActivity(id) {
    this._activityService.getActivity(id).subscribe(
      (response) => {
        if (response.activity) {
          let activity = response.activity;
          activity.start_time = new Date(activity.start_time);
          activity.end_time = new Date(activity.end_time);
          this.activity =activity;
        } else {
          this.status = "error";
        }
      },
      (error) => {
        console.log(<any>error);
        this._router.navigate(["/editactivity", this.activityId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    console.log(this.activity);
    this._activityService
      .updateActivity(this.activity)
      .subscribe(
        (response) => {
          if (!response.activity) {
            this.status = "error";
          } else {
            this.status = "success";
            this.getActivity(this.activityId);
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
