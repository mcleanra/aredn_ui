import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArednApi } from '../../../ArednApi';

@Component({
  selector: 'aredn-signal-chart',
  templateUrl: './signal-chart.component.html',
  styleUrls: ['./signal-chart.component.scss'],
  host: {
    "[style.display]": "'inline-block'",
    "[style.width]": "'100%'",
    "[style.height.px]": "400"
  }
})
export class SignalChartComponent implements OnInit, OnChanges {

  @Input() data: ArednApi.SignalResult[] = [];

  // options
  animations = true;
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time (UTC)';
  showYAxisLabel = true;
  yAxisLabel = 'Signal Strength (dBm)';
  timeline = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  lines = [];

  constructor() {

  }

  updateChart() {
    let lines = [
      {
        "name": "Signal",
        "series": []
      },
      {
        "name": "Noise",
        "series": []
      }
    ];

    this.data.forEach(val => {
      lines[0].series.push(
        {
          name: lines[0].series.length,
          value: +val.y[0] || 0
        }
      );
      lines[1].series.push(
        {
          name: lines[1].series.length,
          value: +val.y[1] || 0
        }
      );
    });

    this.lines = [...lines];
  }

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

  xAxisTickFormatting(val: any) {
    return val + "dBm";
  }
}
