import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { GLOBAL } from "./global";

@Injectable({
  providedIn: "root",
})
export class ServerTimeService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  getServerTime(): Observable<any> {
    return this._http.get(this.url + "status/");
  }
}
