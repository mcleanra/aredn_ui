import { Component, OnInit, OnDestroy } from "@angular/core";
import { ScanService } from "./scan.service";
import { Subscription, Observable, interval } from "rxjs";
import { ScanResult } from "./ScanResult";

@Component({
  selector: "aredn-scan-page",
  templateUrl: "./scan-page.component.html",
  styleUrls: ["./scan-page.component.scss"]
})
export class ScanPageComponent implements OnInit, OnDestroy {
  results: ScanResult[];
  scanning: boolean = false;
  autoScanEnabled = false;

  private subs: Subscription[] = [];
  private sortByColumn = 'signal';
  private descending = true;
  private autoScan: Subscription;
  private autoScanInterval = 6000;

  constructor(private scanService: ScanService) { }

  onAutoScanDisabled() {
    this.autoScanEnabled = false;
    this.autoScan.unsubscribe()
  }

  onAutoScanEnabled() {
    this.autoScanEnabled = true;
    this.scan();
    this.autoScan = interval(this.autoScanInterval)
      .subscribe(() => {
        this.scan();
      })
  }

  scan() {
    this.scanning = true;
    const sub = this.scanService.scan().subscribe(results => {
      this.results = results;
      this.sortBy(this.sortByColumn);
      this.scanning = false;
    });
    this.subs.push(sub);
  }

  sortBy(property: string) {
    if (this.sortByColumn === property) {
      this.descending = !this.descending;
    }
    else {
      this.descending = true;
    }
    this.sortByColumn = property;
    this.results.sort((a: any, b: any) => {
      if (a[property] < b[property]) {
        return this.descending ? 1 : -1;
      } else if (a[property] > b[property]) {
        return this.descending ? -1 : 1;
      } else {
        return 0;
      }
    });

  }

  ngOnInit() {
    this.scan();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => {
      sub.unsubscribe();
    })
  }
}
