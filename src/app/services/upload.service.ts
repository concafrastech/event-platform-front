import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import {Injectable} from '@angular/core';
import { Observable } from 'rxjs';
import {GLOBAL} from './global';

@Injectable()
export class UploadService {
    public url: string;

    constructor(public _http: HttpClient) {
        this.url = GLOBAL.url;
    }

    makeFileRequest(url: string, params: Array<string>, files: Array<File>, token: string, name: string) {
        return new Promise(function(resolve, reject) {
            var formData: any = new FormData();
            var xhr = new XMLHttpRequest();

            for (var i = 0; i < files.length; i++) {
                formData.append(name, files[i], files[i].name);
            }

            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    if (xhr.status == 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }

    //Realiza o upload de um arquivo
  public uploadFile(file: File, token: string, name: string): Observable<any> {
    let formData = new FormData();
    formData.append(name, file, file.name);

    let headers = new HttpHeaders()
      //Cabeçalho removido porque ao adicionar na requisição provocava erro 500
      .set("Authorization", token);

    const requisicao = new HttpRequest(
      "POST",
      this.url + 'upload-image-user/',
      formData,
      { headers: headers }
      /*, reportProgress: true  */
    );
    return this._http.request(requisicao);
  }
}
