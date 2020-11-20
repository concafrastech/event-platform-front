import {AfterViewInit, Component, OnInit} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'app-social-home',
    templateUrl: './social-home.component.html',
    providers: [UserService]
})
export class SocialHomeComponent implements OnInit, AfterViewInit {
    public title: string;
    public identity;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
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
