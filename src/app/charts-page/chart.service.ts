import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, interval } from 'rxjs';
import { concatMap, map, take } from 'rxjs/operators';
import { SignalResult } from './signal-result';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  constructor(private http: HttpClient) { }

  poll(everySeconds: number = 1, device: string = ""): Observable<SignalResult[]> {
    const signal$ = this.read(true, device);

    const observable = interval(everySeconds * 1000)
      .pipe(
        concatMap(() => signal$),
        map((response: SignalResult[]) => response)
      );

    return observable;
  }

  read(realtime: boolean = false, device: string = ""): Observable<SignalResult[]> {
    return this.http.get(`/cgi-bin/signal.json?${realtime ? 'realtime=1&' : ''}device=${device}`)
      .pipe(
        take(1),
        map((resp: any) => resp[0] as SignalResult[])
      )
  }
}
