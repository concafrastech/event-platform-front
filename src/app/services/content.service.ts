import { HttpClient, HttpRequest, HttpHeaders } from "@angular/common/http";
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

  uploadFile(files: Set<File>): Observable<any>{
    let formData = new FormData();
    files.forEach((arquivo) => {
      formData.append("arquivo", arquivo, arquivo.name);
    })

    let headers = new HttpHeaders()
      .set("Content-Type", "multipart/form-data")
      .set("Authorization", this._userService.getToken());

    const requisicao = new HttpRequest("POST", this.url + "contents/uploads", formData, { headers: headers, reportProgress: true});
    return this._http.request(requisicao);
  }

  
}
