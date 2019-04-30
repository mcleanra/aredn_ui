import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { ChartPageDataService } from "../chart-page-data.service";
import { ArednApi } from "src/ArednApi";
import { takeUntil, first } from "rxjs/operators";
import { DisposableComponent } from "../DisposableComponent";

@Component({
  selector: "aredn-charts-page",
  templateUrl: "./charts-page.component.html",
  styleUrls: ["./charts-page.component.scss"]
})
export class ChartsPageComponent extends DisposableComponent implements OnInit, OnDestroy {
  public results: ArednApi.SignalResult[] = [];
  public pollIntervalMilliseconds: number = 1000;
  public polling = false;
  public snr: number;

  private poll: Subscription;

  constructor(public chartService: ChartPageDataService) {
    super();
  }

  addResult(signalResults: ArednApi.SignalResult[]) {
    this.results = this.results.concat(signalResults);
  }

  clear() {
    this.results = [];
  }

  onGetArchive() {
    this.onStopPolling();
    this.clear();
    this.getSignal("archive");
  }

  getSignal(realtimeOrArchive: string = "realtime") {
    this.chartService.get<ArednApi.SignalResult[]>(realtimeOrArchive)
      .pipe(
        first(),
        takeUntil(this.disposer)
      )
      .subscribe(
        results => this.onResultsReceived(results),
        error => console.error(error),
        () => {/*done*/ }
      );
  }

  ngOnInit() {
    this.onStartPolling();
  }

  onResultsReceived(signalResults: ArednApi.SignalResult[]) {
    this.updateSnr(signalResults);
    this.addResult(signalResults);
  }

  onStartPolling() {
    this.clear();
    this.polling = true;
    this.poll = interval(this.pollIntervalMilliseconds)
      .pipe(takeUntil(this.disposer))
      .subscribe(() => {
        this.getSignal("realtime");
      });
  }

  onStopPolling() {
    this.polling = false;
    this.poll.unsubscribe();
  }

  //is this correct?  i'm not sure we're doing the correct calculation for SNR here
  //keeping it the same as the old code for now
  updateSnr(signalResults: ArednApi.SignalResult[]) {
    if (signalResults.length == 0) {
      this.snr = 0;
    }
    else {
      let lastResult = signalResults[signalResults.length - 1];
      this.snr = lastResult.signal_dbm - lastResult.noise_dbm;
    }
  }

}
