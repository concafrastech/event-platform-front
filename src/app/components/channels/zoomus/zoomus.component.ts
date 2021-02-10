import { Component, OnInit, Input } from '@angular/core';
import { GLOBAL } from 'src/app/services/global';
import { Content } from 'src/app/models/content';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-zoomus',
  templateUrl: './zoomus.component.html',
  styleUrls: ['./zoomus.component.css'],
  providers: [UserService]
})
export class ZoomusComponent implements OnInit {

  @Input() public vContent: Content;
  public identity;
  sourceUrl: string = '';

  constructor(
    private _userService: UserService 
  ) {

  }

  ngOnInit() {

    // Como pegar usuário logado
    this.identity = this._userService.getIdentity();
    this.sourceUrl = GLOBAL.zoomUrl + "/" + this.vContent._id + "/" + this.identity._id
  }

}