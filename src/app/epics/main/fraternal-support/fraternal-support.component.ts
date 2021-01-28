import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-fraternal-support',
  templateUrl: './fraternal-support.component.html',
  styleUrls: ['./fraternal-support.component.css'],
  providers: [UserService]
})
export class FraternalSupportComponent implements OnInit {

  public closeBtnName : string;
  public title : string;
  public tawkId = "5f918320b5546b2d39909b27";

  constructor(
    private _userService : UserService,
    public bsModalRef: BsModalRef
    ) { }

  ngOnInit(): void {
  }

}
