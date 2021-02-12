import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Content } from 'src/app/models/content';
import { UserService } from 'src/app/services/user.service';
import { FraternalSupportComponent } from '../fraternal-support/fraternal-support.component';

@Component({
  selector: 'app-magnetic-pass-distance',
  templateUrl: './magnetic-pass-distance.component.html',
  styleUrls: ['./magnetic-pass-distance.component.css']
})
export class MagneticPassDistanceComponent implements OnInit {

  public closeBtnName: string;
  public title: string;
  public bsModalRefFraternal: BsModalRef;
  public actualContent: Content;

  constructor(
    private _userService: UserService,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef
  ) { }

  ngOnInit(): void {
    this.actualContent = this.temporaryContent(
      "https://youtu.be/pDOQzJD67iQ"
    );
  }

  openFraternalSupportComponent() {
    this.bsModalRef.hide();
    const initialState = {
      title: "Apoio Fraterno?",
    };
    this.bsModalRefFraternal = this._modalService.show(FraternalSupportComponent, {
      initialState,
      class: "modal-lg",
    });
    this.bsModalRef.content.closeBtnName = "Fechar";
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
