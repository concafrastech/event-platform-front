import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';

@Injectable()
export class AdminService {
    public url: String;
    public token;

    constructor(public _http: HttpClient ) { 
        this.url = GLOBAL.url;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }

    helloWorld() {
        console.log("Hello World");
        // let headers = new HttpHeaders()
        //     .set('Content-Type', 'application/json')
        //     .set('Authorization', this.getToken());

        // return this._http.get(this.url + "admin", {headers: headers});
    }
}