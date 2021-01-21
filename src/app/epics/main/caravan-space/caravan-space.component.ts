import { ShareMessageComponent } from './../share-message/share-message.component';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-caravan-space',
  templateUrl: './caravan-space.component.html',
  styleUrls: ['./caravan-space.component.css']
})
export class CaravanSpaceComponent implements OnInit {

  public bsModalRef: BsModalRef;
  
  constructor(
    private _router: Router,
    private _userService: UserService,
    private _modalService: BsModalService
  ) { }

  ngOnInit(): void {
  }

  openShareMessageComponent(){
    const initialState = {
      title: 'Compartilhar Mensagem'
    };
    this.bsModalRef = this._modalService.show(ShareMessageComponent, {initialState, class: 'modal-lg'});
    this.bsModalRef.content.closeBtnName = 'Fechar';
  }

}
