import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from '@angular/router';
import { NgBootstrapAlertService } from 'ng-bootstrap-alert';
import { BsModalService } from 'ngx-bootstrap/modal';
import { GLOBAL } from 'src/app/services/global';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: "app-social-dashboard",
  templateUrl: "./social-dashboard.component.html",
  styleUrls: ["./social-dashboard.component.css"],
})
export class SocialDashboardComponent implements OnInit {
  public title: string;
  public identity;
  public url: string;
  public user;
  public progress;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    public _bootstrapAlertService: NgBootstrapAlertService,
    private modalService: BsModalService
  ) {
    this.title = "EVENTO";
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    this.identity = this._userService.getIdentity();
  }

  ngDoCheck() {
    this.identity = this._userService.getIdentity();
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(["/login"]);
  }
}
