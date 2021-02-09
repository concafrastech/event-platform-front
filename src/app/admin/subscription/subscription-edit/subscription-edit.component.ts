import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BsLocaleService } from "ngx-bootstrap/datepicker";
import { Conference } from 'src/app/models/conference';
import { Subscription } from "src/app/models/subscription";
import { ConferenceService } from "src/app/services/conference.service";
import { SubscriptionService } from "src/app/services/subscription.service";
import { GLOBAL } from "src/app/services/global";
import { UserService } from "src/app/services/user.service";
import { NgxSpinnerService } from "ngx-spinner";
import { TrailService } from "src/app/services/trail.service";

@Component({
  selector: "app-subscription-edit",
  templateUrl: "./subscription-edit.component.html",
  styleUrls: ["./subscription-edit.component.css"],
  providers: [UserService, SubscriptionService, ConferenceService, TrailService],
})
export class SubscriptionEditComponent implements OnInit {
  public title: string;
  public subscriptionId: string;
  public url: string;
  public status: string;
  public subscription: Subscription;
  public identity: string;
  public conferences = [];
  public trailsList = [];

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _subscriptionService: SubscriptionService,
    private _userService: UserService,
    private _conferenceService: ConferenceService,
    private _trailService: TrailService,
    private _bsLocaleService: BsLocaleService,
    private _spinner: NgxSpinnerService
  ) {
    this.title = "Editar Épicos";
    this.url = GLOBAL.url;
    this._bsLocaleService.use("pt-br");
  }

  ngOnInit() {
    console.log("[OK] Component: subscription-edit.");
    this._spinner.show();
    this.identity = this._userService.getIdentity();
    this.subscription = new Subscription('', 0, '', null, null, [], new Date(), new Date());
    this.subscription.conference = new Conference(null,'', false, '', '', new Date(), new Date(),false,'',false,'', false, false, false, false, false, new Date(), new Date());
    this.loadPage();
  }

  loadPage() {
    this._conferenceService
      .getConferences()
      .subscribe(
        (response) => {
          if (response) {
            this.conferences = response.conferences;
            this.getTrails();
          }
        },
        (error) => {
          this._spinner.hide();
          console.log(<any>error);
        }
      );
  }

  getTrails() {
    this._trailService.getFullTrails().subscribe(
      (response) => {
        if (response) {
          this.trailsList = response.trails;
          this._route.params.subscribe((params) => {
            this.subscriptionId = params["id"];
            this.getSubscription(this.subscriptionId);
          });
        } 
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
      }
    );
  }

  getSubscription(id) {
    this._subscriptionService.getSubscription(id).subscribe(
      (response) => {
        if (response.subscription) {
          this._spinner.hide();
          this.subscription = response.subscription;
        } else {
          this._spinner.hide();
          this.status = "error";
        }
      },
      (error) => {
        this._spinner.hide();
        console.log(<any>error);
        this._router.navigate(["/admin/subscription/edit", this.subscriptionId]);
      }
    );
  }

  /* Return true or false if it is the selected */
  compareByOptionId(idFist, idSecond) {
    return idFist && idSecond && idFist._id == idSecond._id;
  }

  onSubmit() {
    this._spinner.show();
    this._subscriptionService
      .updateSubscription(this.subscription)
      .subscribe(
        (response) => {
          if (!response.subscription) {
            this._spinner.hide();
            this.status = "error";
          } else {
            this._spinner.hide();
            this.status = "success";
            this.getSubscription(this.subscriptionId);
          }
        },
        (error) => {
          this._spinner.hide();
          var errorMessage = <any>error;
          console.log(errorMessage);
          if (errorMessage != null) {
            this.status = "error";
          }
        }
      );
  }
}
