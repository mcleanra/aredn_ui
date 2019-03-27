import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'aredn-signal',
  templateUrl: './signal.component.html',
  styleUrls: ['./signal.component.scss']
})
export class SignalComponent implements OnInit {

  @Input() db: string;
  level = 0;

  constructor() { }

  //round signal to the nearest level in range: 0, 25, 50 75, 100 (4 steps from 0 to 100)
  nearest(value, min, max, steps) {
    const zerone = Math.round((value - min) * steps / (max - min)) / steps;
    return zerone * (max - min) + min;
  }

  ngOnInit() {
    const inverse = 100 - Math.abs(parseInt(this.db));
    this.level = this.nearest(inverse + 10, 0, 100, 4);
  }

}
