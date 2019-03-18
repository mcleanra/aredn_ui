import { Component, OnInit, OnDestroy } from "@angular/core";
import { ChartService } from "./chart.service";
import { Subscription } from "rxjs";
import { SignalResult } from "./signal-result";

@Component({
  selector: "aredn-charts-page",
  templateUrl: "./charts-page.component.html",
  styleUrls: ["./charts-page.component.scss"]
})
export class ChartsPageComponent implements OnInit, OnDestroy {
  public results: SignalResult[] = [];
  public pollInterval: number = 1;
  public polling = false;

  private subscriptions: Subscription[] = [];

  constructor(public chartService: ChartService) { }

  addResult(results: SignalResult[]) {
    this.results = this.results.concat(results);
  }

  ngOnInit() {
    //gets some historical data to start with
    this.subscriptions.push(
      this.chartService.read().subscribe(res => this.addResult(res))
    );
  }

  ngOnDestroy() {
    this.unsubscribeAll();
  }

  onStartPolling() {
    this.polling = true;
    this.subscriptions.push(
      this.chartService
        .poll(this.pollInterval)
        .subscribe(res => this.addResult(res))
    );
  }

  onStopPolling() {
    this.polling = false;
    this.unsubscribeAll();
  }

  unsubscribeAll() {
    this.subscriptions.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
