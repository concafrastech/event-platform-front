import {Component, OnInit, DoCheck} from '@angular/core';

@Component({
    selector: 'message-main',
    templateUrl: './main.component.html',
})
export class MainComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Mensagens privadas';
    }

    ngOnInit() {
        console.log('[OK] Component: main-messages.');
    }
}
