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
import { DocumentService } from "./document.service";
import { Content } from "../models/content";
import { concat } from "rxjs";
import { concatMap } from "rxjs/operators";
import { map } from "rxjs/operators";

@Injectable()
export class ContentService {
  public url: String;
  public token;

  public filesUploaded: EventEmitter<boolean>;

  constructor(
    public _http: HttpClient,
    private _userService: UserService,
    private _documentService: DocumentService
  ) {
    this.url = GLOBAL.url;
  }

  getContent(id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._userService.getToken());

    return this._http.get(this.url + "contents/" + id, { headers: headers });
  }

  addContent(content): Observable<any> {
    let params = JSON.stringify(content);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._userService.getToken());

    return this._http.post(this.url + "contents", params, { headers: headers });
  }

  updateContent(content: Content): Observable<any> {
    let params = JSON.stringify(content);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._userService.getToken());

    return this._http.put(this.url + "contents/" + content._id, params, {
      headers: headers,
    });
  }

  deleteContent(id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", this._userService.getToken());

    return this._http.delete(this.url + "contents/" + id, { headers: headers });
  }

  //Recebe um array de contents e retorna um Observable que executará a inserção na ordem.
  saveContents(VContents: Content[]): Observable<any> {
    let obs$: Observable<any>[] = [];
    VContents.map((content) => {
      if (content._id) {
        obs$.push(this.updateContent(content));
      } else {
        obs$.push(this.addContent(content));
      }
    });

    return concat(obs$).pipe(
      concatMap((observableContent) => {
        return observableContent;
      })
    );
  }

  //Recebe um array de contents e retorna um Observable que executará o upload em ordem.
  uploadContents(VContents: Content[]): Observable<any> {
    let obs$: Observable<any>[] = [];
    VContents.map((content) => {
      if (
        content.type == "audio" ||
        content.type == "img" ||
        content.type == "doc"
      ) {
        if (content.fileToUpload) {
          obs$.push(
            this.uploadFile(content.fileToUpload).pipe(
              map((response) => {
                //Final do upload
                if (response.type == HttpEventType.Response) {
                  content.file = response.body.document;
                  content.fileToUpload = null;
                }
              })
            )
          );
        } else {
          if (content.file._id) {
            obs$.push(
              this._documentService.updateDocument(content.file).pipe(
                map((response) => {
                  //Final do upload
                  if (response.document) {
                    content.file = response.document;
                    content.fileToUpload = null;
                  }
                })
              )
            );
          }
        }
      }
    });

    return concat(obs$).pipe(
      concatMap((observableFile) => {
        return observableFile;
      })
    );
  }

  //Realiza o upload de um arquivo
  public uploadFile(file: File): Observable<any> {
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
