import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import { Subscription } from 'src/app/models/subscription';
import { SubscriptionService } from 'src/app/services/subscription.service';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ResetPassComponent } from './reset-pass/reset-pass.component';

@Component({
    selector: 'login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    providers: [UserService]
})
export class LoginComponent implements OnInit {
    public title: string;
    public user: User;
    public status: string;
    public identity;
    public token;
    public subscriptions: Subscription[] = [];
    public bsModalRef: BsModalRef;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _modalService: BsModalService,
    ) {
        this.title = 'Seja bem vindo';
        this.user = new User("", "", false, "", "", "", "", "", new Date(), "", "", "", "", "", "", false, "", "ROLE_USER", null, 0, false, [], {});
    }

    ngOnInit() {
        console.log('[OK] Component: login.');
        localStorage.setItem('epic', null);
        this.showPassword();
    }

    onSubmit() {
        let exp = /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/
        
        if(!exp.test(this.user.email)){
            this.user.email += '-fake@concafras.com'
        }
        
        this._userService.signup(this.user, 'true').subscribe(
            response => {
                this.token = response.idToken;
                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    localStorage.setItem('token', JSON.stringify(this.token));
                    this.getUser();
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

    getUser() {
        this._userService.signup(this.user, 'false').subscribe(
            response => {
                this.identity = response.user;
                if (!this.identity || !this.identity._id) {
                    this.status = 'error';
                } else {
                    this.status = 'success';
                    localStorage.setItem('identity', JSON.stringify(this.identity));
                    this.getSubscription();
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

    getSubscription(){
        this._userService.getSubscriptions(this.identity._id).subscribe(
            response => {
                this.identity.subscriptions = response.subscriptions;
                localStorage.setItem('subscriptions', JSON.stringify(response.subscriptions));
                this.getCounters();
            }
        );
    }

    getCounters() {
        this._userService.getCounter().subscribe(
            response => {
                localStorage.setItem('stats', JSON.stringify(response));
                this.status = "success";
                console.log(response);
                if(this.identity.subscriptions.length == 1){
                    console.log(this.identity.subscriptions[0]);
                    localStorage.setItem('subscriptions', JSON.stringify(this.identity.subscriptions));
                    localStorage.setItem('currentSubscription', JSON.stringify(this.identity.subscriptions[0]));
                    localStorage.setItem('currentConference', JSON.stringify(this.identity.subscriptions[0].conference));
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

    showPassword() {
        let btn = document.querySelector('.lnr-eye');
        btn.addEventListener('click', function() {
            let input = document.querySelector('#senha');
            if(input.getAttribute('type') == 'password') {
                input.setAttribute('type', 'text');
            } else {
                input.setAttribute('type', 'password');
            }
        });
    }

    openResetPassComponent() {
        const initialState = {
          title: "Esqueceu sua senha?",
        };
        this.bsModalRef = this._modalService.show(ResetPassComponent, {
          initialState,
          class: "modal-lg",
        });
        this.bsModalRef.content.closeBtnName = "Fechar";
    }
}
