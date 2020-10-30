import {AfterViewInit, Component, OnInit} from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {UserService} from '../../services/user.service';
import { TutorialComponent } from '../tutorial/tutorial.component';
import { WelcomeComponent } from '../welcome/welcome.component';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    providers: [UserService]
})
export class HomeComponent implements OnInit, AfterViewInit {
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
        console.log('[OK] Component: home.');
        console.log('event-platform-concafras App Version: 0.2.0');
        this.identity = this._userService.getIdentity();
    }

    ngAfterViewInit(){
        if(this.identity){
            this.openWelcomeComponent();
        }
    }

    onSubmit() {
    }

    openWelcomeComponent() {
        const initialState = {
          list: [
            'Open a modal with component',
            'Pass your data',
            'Do something else',
            '...'
          ],
          title: 'Seja bem vindo'
        };
        this.bsModalRef = this.modalService.show(WelcomeComponent, {initialState, class: 'modal-lg'});
        this.bsModalRef.content.closeBtnName = 'Próximo';
        this.bsModalRef.onHide.subscribe((e) => {
            this.openModalWithComponent();
        });
    }

    openModalWithComponent() {
        const initialState = {
          list: [
            'Open a modal with component',
            'Pass your data',
            'Do something else',
            '...'
          ],
          title: 'Tutorial'
        };
        this.bsModalRef2 = this.modalService.show(TutorialComponent, {initialState, class: 'modal-lg'});
        this.bsModalRef2.content.closeBtnName = 'Próximo';
    }
}
