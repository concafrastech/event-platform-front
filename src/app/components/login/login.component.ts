import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public subscriptions: Subscription[] = [];

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService
    ) {
        this.title = 'Seja bem vindo';
        this.user = new User("", "", "", "", "", new Date(), "", "", "", "", "", "", false, "", "ROLE_USER", "", 0, false, [], {});
    }

    ngOnInit() {
        console.log('[OK] Component: login.');
        localStorage.setItem('epic', null);
    }

    onSubmit() {
        this._userService.signup(this.user).subscribe(
            response => {
                this.identity = response.user;
                console.log(this.identity);
                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    localStorage.setItem('subscriptions', JSON.stringify(this.identity.subscriptions));
                    this.getToken();
                }
            },
            error => {
                console.log(<any> error);
                var errorMessage = <any> error;
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    getToken() {
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.token;
                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    localStorage.setItem('token', JSON.stringify(this.token));
                    this.getCounters();
                }
            },
            error => {
                console.log(<any> error);
                var errorMessage = <any> error;
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

    getCounters() {
        this._userService.getCounter().subscribe(
            response => {
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = "success";
                if(this.identity.subscriptions.length == 1 && this.identity.subscriptions[0].active){
                    localStorage.setItem('currentSubscription', JSON.stringify(this.identity.subscriptions[0]));
                    this._router.navigate(['/select-journey']);
                } else {
                    this._router.navigate(['/select-conference']);
                }
            },
            error => {
                console.log(<any> error);
            }
        );
    }
}
