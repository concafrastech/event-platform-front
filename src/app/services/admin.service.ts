import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GLOBAL } from './global';
import { UserService } from './user.service';

@Injectable()
export class AdminService {
    public url: String;
    public token;

    constructor(
        public _http: HttpClient,
        private _userService: UserService
    ) { 
        this.url = GLOBAL.url;
    }

    helloWorld() {
        console.log("Hello World");
        this._userService
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            .set('Authorization', this._userService.getToken());

        console.log(headers);
        return this._http.get(this.url + "admin", {headers: headers});
    }
}