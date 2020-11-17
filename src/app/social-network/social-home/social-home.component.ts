import {AfterViewInit, Component, OnInit} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'home',
    templateUrl: './social-home.component.html',
    providers: [UserService]
})
export class SocialHomeComponent implements OnInit, AfterViewInit {
    public title: string;
    public identity;
    bsModalRef: BsModalRef;
    bsModalRef2: BsModalRef;

    constructor(
        private _userService: UserService,
        private modalService: BsModalService
    ) {
        this.title = 'Bem Vindos!';
    }

    ngOnInit() {
        this.identity = this._userService.getIdentity();
    }

    ngAfterViewInit(){
    }

    onSubmit() {
    }
}
