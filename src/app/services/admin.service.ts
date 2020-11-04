import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
export class AdminService {
    public url: String;

    constructor(public _http: HttpClient ) { 
        this.url = GLOBAL.url;
    }

    helloWorld() {
        return this._http.get(this.url + "admin");
    }
}