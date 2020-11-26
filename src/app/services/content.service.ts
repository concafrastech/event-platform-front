import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";

@Injectable()
export class ContentService {
  public url: String;
  public token;

  constructor(public _http: HttpClient, private _userService: UserService) {
    this.url = GLOBAL.url;
  }

  addContent(content): Observable<any> {
    let params = JSON.stringify(content);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._userService.getToken());

    return this._http.post(this.url + "contents", params, { headers: headers });
  }
}
