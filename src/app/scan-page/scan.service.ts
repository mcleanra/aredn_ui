import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ScanService {
  constructor(private http: HttpClient) { }

  scan(): Observable<any> {
    return this.http.get(`/cgi-bin/scan.json`).pipe(
      map((resp: any) => resp.results)
    )
  }
}
