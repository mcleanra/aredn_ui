import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription, interval } from "rxjs";
import { ScanPageDataService } from "../scan-page-data.service";
import { DisposableComponent } from "../DisposableComponent";
import { takeUntil, map } from "rxjs/operators";

@Component({
  selector: "aredn-scan-page",
  templateUrl: "./scan-page.component.html",
  styleUrls: ["./scan-page.component.scss"]
})
export class ScanPageComponent extends DisposableComponent
  implements OnInit, OnDestroy {
  scanning: boolean = false;
  autoScanEnabled = false;

  private autoScan: Subscription;
  private autoScanInterval = 6000;
  private lastScanTime: Date;
  private _results: {} = {};

  //results are stored by mac for easy updating
  set results(results: any[]) {
    results.forEach(result => (this._results[result.bssid] = result));
  }
  get results() {
    return Object.values(this._results);
  }

  constructor(private scanService: ScanPageDataService) {
    super();
  }

  filterByActive() {
    return this.results.filter(result => result.seen === this.lastScanTime);
  }

  filterByInactive() {
    return this.results.filter(result => result.seen !== this.lastScanTime);
  }

  ngOnInit() {
    this.scan();
  }

  onAutoScanDisabled() {
    this.autoScanEnabled = false;
    this.autoScan.unsubscribe();
  }

  onAutoScanEnabled() {
    this.autoScanEnabled = true;
    this.scan();
    this.autoScan = interval(this.autoScanInterval)
      .pipe(takeUntil(this.disposer))
      .subscribe(() => {
        this.scan();
      });
  }

  onScanResultsReceived(results: any[]) {
    this.results = results;
    this.scanning = false;
  }

  scan() {
    this.scanning = true;

    this.scanService
      .get<any[]>("scanlist")
      .pipe(
        takeUntil(this.disposer),
        map(this.timestampResults, this)
      )
      .subscribe(
        results => {
          this.onScanResultsReceived(results);
        },
        error => console.error(error),
        () => {
          /*done*/
        }
      );
  }

  //timestamp each result as we receive it
  //this is how we know which APs are active/inactive
  timestampResults(results: any[]): any[] {
    this.lastScanTime = new Date();
    results.map(result => (result.seen = this.lastScanTime));
    return results;
  }
}
