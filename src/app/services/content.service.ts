import { concatMap } from "rxjs/operators";
import {
  HttpClient,
  HttpRequest,
  HttpHeaders,
  HttpEventType,
} from "@angular/common/http";
import { EventEmitter, Injectable } from "@angular/core";
import { GLOBAL } from "./global";
import { Observable } from "rxjs/Observable";
import { UserService } from "./user.service";
import { Content } from "../models/Content";
import { forkJoin } from "rxjs/internal/observable/forkJoin";
import { concat } from "rxjs";

@Injectable()
export class ContentService {
  public url: String;
  public token;

  public filesUploaded: EventEmitter<boolean>;

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

  //Recebe um array de contents e retorna um Observable que executará o upload em ordem.
  uploadContents(VContents: Content[]): Observable<any> {
    let obs$: Observable<any>[] = [];
    VContents.map((content) => {
      if (content.fileToUpload) {
        obs$.push(this.uploadFile(content.fileToUpload));
      }
    });

    return concat(obs$).pipe(
      concatMap((observableFile) => {
        return observableFile;
      })
    );
  }

  //Realiza o upload de um arquivo
  private uploadFile(file: File): Observable<any> {
    let formData = new FormData();
    formData.append("file", file, file.name);

    let headers = new HttpHeaders()
      //Cabeçalho removido porque ao adicionar na requisição provocava erro 500
      /*.set("Content-Type", "multipart/form-data;")*/
      .set("Authorization", this._userService.getToken());

    const requisicao = new HttpRequest(
      "POST",
      this.url + "documents",
      formData,
      { headers: headers }
      /*, reportProgress: true  */
    );
    return this._http.request(requisicao);
  }
}
