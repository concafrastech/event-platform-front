import {Component, OnInit, DoCheck} from '@angular/core';

@Component({
    selector: 'app-hero-main',
    templateUrl: './hero-main.component.html',
})
export class HeroMainComponent implements OnInit {
    public title: string;

    constructor() {
        this.title = 'Heroes';
    }

    ngOnInit() {
        console.log('[OK] Component: main-heroes.');
    }
}
