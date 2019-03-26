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
  public pollInterval: number = 1000;
  public polling = false;
  public snr: number;

  private poll: Subscription;

  constructor(public chartService: ChartPageDataService) {
    super();
  }

  addResult(result: ArednApi.SignalResult[]) {
    this.results = this.results.concat(result);
  }

  getSignal(realtimeOrArchive: string = "realtime") {
    this.chartService.get<[ArednApi.SignalResult[]]>(realtimeOrArchive)
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
    //gets some historical data to start with
    this.getSignal("archive");
  }

  onResultsReceived(results: [ArednApi.SignalResult[]]) {
    this.updateSnr(results[0]);
    this.addResult(results[0]);
  }

  onStartPolling() {
    this.polling = true;
    this.poll = interval(this.pollInterval)
      .pipe(takeUntil(this.disposer))
      .subscribe(() => {
        this.getSignal("realtime");
      });
  }

  onStopPolling() {
    this.polling = false;
    this.poll.unsubscribe();
  }

  updateSnr(results: ArednApi.SignalResult[]) {
    this.snr = results[results.length - 1].m;
  }

}
