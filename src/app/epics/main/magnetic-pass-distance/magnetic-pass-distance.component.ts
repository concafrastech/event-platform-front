import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-magnetic-pass-distance',
  templateUrl: './magnetic-pass-distance.component.html',
  styleUrls: ['./magnetic-pass-distance.component.css']
})
export class MagneticPassDistanceComponent implements OnInit {

  public closeBtnName : string;
  public title : string;
  
  constructor(private _userService : UserService,
    public bsModalRef: BsModalRef,) { }

  ngOnInit(): void {
  }

}
