import { DocumentService } from "src/app/services/document.service";
import { MagneticPassDistanceComponent } from "./../magnetic-pass-distance/magnetic-pass-distance.component";
import { Component, ElementRef, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgBootstrapAlertService } from "ng-bootstrap-alert";
import { UserService } from "src/app/services/user.service";

import { faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ScheduleComponent } from "src/app/components/schedule/schedule.component";
import { FraternalSupportComponent } from "../fraternal-support/fraternal-support.component";
import { TawkService } from "src/app/services/tawk-service";
import { UserGamificationService } from "src/app/services/user-gamification.service";

@Component({
  selector: "app-left-sidebar",
  templateUrl: "./left-sidebar.component.html",
  styleUrls: ["./left-sidebar.component.css"],
  providers: [UserService, DocumentService, TawkService],
})
export class LeftSidebarComponent implements OnInit {
  public identity;
  public user;
  public progress;
  public bsModalRef: BsModalRef;
  public showChat: boolean = false;

  public faUserCircle = faUserCircle;
  public jivoChat: ElementRef;

  constructor(
    private _router: Router,
    private _userService: UserService,
    public _bootstrapAlertService: NgBootstrapAlertService,
    private _modalService: BsModalService,
    private _documentService: DocumentService,
    public _userGamification: UserGamificationService
  ) {
    this.progress = {
      max: 0,
      value: 0,
    };
    this.user = this._userService.getIdentity();
    this.initGamefication();
  }

  ngOnInit(): void {
    this.identity = this._userService.getIdentity();
    console.log("[OK] left sidebar");

    this._documentService.getDocument(this.user.image).subscribe((response) => {
      this.user.image = response.document;
    });
  }

  openProgramacaoComponent() {
    const initialState = {
      title: "Programação",
    };
    this.bsModalRef = this._modalService.show(ScheduleComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }

  openMagneticPassDistanceComponent() {
    const initialState = {
      title: "O passe pode ser dado à distância?",
    };
    this.bsModalRef = this._modalService.show(MagneticPassDistanceComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }

  openFraternalSupportComponent() {
    const initialState = {
      title: "Apoio Fraterno?",
    };
    this.bsModalRef = this._modalService.show(FraternalSupportComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
  }

  openCloseFraternalSupportChat() {
    this.showChat = !this.showChat;
  }

  logout() {
    localStorage.clear();
    this.identity = null;
    this._router.navigate(["/login"]);
  }

  initGamefication() {
    this.user.level = this._userGamification.getLevel();
    this.user.points = this._userGamification.getPoints();
  }
}
