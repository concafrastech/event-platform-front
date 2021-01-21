import { ShareMessageService } from '../../../services/share-message.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { ShareMessage } from 'src/app/models/share-message';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-share-message',
  templateUrl: './share-message.component.html',
  styleUrls: ['./share-message.component.css'],
  providers: [UserService, ShareMessageService]
})
export class ShareMessageComponent implements OnInit {
  public title: string;
    public user: User;
    public shareMessage: ShareMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _userService: UserService,
    private _shareMessageService: ShareMessageService,
    public bsModalRef: BsModalRef,
) {
    this.title = 'Compartilhar Mensagem';
    this.user = this._userService.getIdentity();
}

  ngOnInit(): void {
    console.log("[OK] Component: share-message.");
    this.shareMessage = new ShareMessage(null, "", this.user, null)
  }

  onSubmit(){
    this.shareMessage.created_at = new Date();
    this._shareMessageService.addShareMessage(this.shareMessage).subscribe((resposta)=>{
      console.log(resposta);
    });
  }
}
