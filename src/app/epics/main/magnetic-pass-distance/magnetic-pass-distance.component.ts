import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';
import { FraternalSupportComponent } from '../fraternal-support/fraternal-support.component';

@Component({
  selector: 'app-magnetic-pass-distance',
  templateUrl: './magnetic-pass-distance.component.html',
  styleUrls: ['./magnetic-pass-distance.component.css']
})
export class MagneticPassDistanceComponent implements OnInit {

  public closeBtnName : string;
  public title : string;
  public bsModalRefFraternal: BsModalRef;
  
  constructor(private _userService : UserService,
    private _modalService: BsModalService,
    public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
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
}
