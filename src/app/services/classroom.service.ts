import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { GLOBAL } from "./global";
import { Classroom } from "../models/classroom";
import { getToken } from "../utils/token";
import { concat } from "rxjs";
import { concatMap } from "rxjs/operators";

@Injectable()
export class ClassroomService {
  public url: string;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  saveclassrooms(classrooms: Classroom[]): Observable<any>[] {
    let obs$: Observable<any>[] = [];
    classrooms.map((classroom) => {
        if(classroom._id) {
            obs$.push(this.updateClassroom(classroom));
        } else {
            obs$.push(this.addClassroom(classroom));
        }
    });
    return obs$;
    /*return concat(obs$).pipe(
      concatMap((observableClassroom) => {
        return observableClassroom;
      })
    );*/
  }

  addClassroom(classroom): Observable<any> {
    let params = JSON.stringify(classroom);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.post(this.url + "classrooms", params, {
      headers: headers,
    });
  }

  updateClassroom(classroom: Classroom): Observable<any> {
    let params = JSON.stringify(classroom);
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.put(this.url + "classrooms/" + classroom._id, params, {
      headers: headers,
    });
  }

  getClassrooms(page = null, trailId = null): Observable<any> {
    let params = {
      page: page,
      trail: trailId != null ? trailId : "",
    };
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.get(this.url + "classrooms/", {
      headers: headers,
      params: params,
    });
  }

  getClassroom(id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.get(this.url + "classrooms/" + id, { headers: headers });
  }

  deleteClassroom(id): Observable<any> {
    let headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", getToken());

    return this._http.delete(this.url + "classrooms/" + id, {
      headers: headers,
    });
  }
}
