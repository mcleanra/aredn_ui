import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "aredn-signal-icon",
  templateUrl: "./signal-icon.component.html",
  styleUrls: ["./signal-icon.component.scss"]
})
export class SignalIconComponent implements OnInit {
  @Input() dBm: number;
  @Input() quality: number;

  bars = 0;

  constructor() { }

  //round signal to the nearest quality level in range: 0, 25, 50 75, 100 (4 steps from 0 to 100)
  //from a Stack Overflow answer by Gabriele Petrioli
  //https://stackoverflow.com/questions/13634813/javascript-round-to-the-nearest-value-on-a-scale/13634939
  nearest(value, min, max, steps) {
    const zerone = Math.round(((value - min) * steps) / (max - min)) / steps;
    return zerone * (max - min) + min;
  }

  //from a Stack Overflow answer by David Manpearl
  //https://stackoverflow.com/questions/15797920/how-to-convert-wifi-signal-strength-from-quality-percent-to-rssi-dbm/30585711
  dbmToQuality(dBm: number) {
    let quality = 0;

    if (dBm <= -100) {
      quality = 0;
    } else if (dBm >= -50) {
      quality = 100;
    } else {
      quality = 2 * (dBm + 100);
    }

    return quality;
  }

  ngOnInit() {
    if (!this.quality) {
      this.quality = this.dbmToQuality(this.dBm);
    }
    this.bars = this.nearest(this.quality, 0, 100, 4);
  }
}
