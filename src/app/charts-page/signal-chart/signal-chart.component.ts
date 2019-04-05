import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArednApi } from '../../../ArednApi';
import { formatDate } from '@angular/common';

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
      //when getting "archive" data, each label contains date and time MM/dd/yyyy HH:MM:SS
      //when getting "realtime" data, each label only contains the time 'HH:MM:SS'
      //here we are checking for this and prepending today's date (UTC) to make everything consistent
      if (val.label.length == 8) {
        val.label = `${formatDate(Date.now(), 'MM/dd/yyyy', 'en-US', 'UTC')} ${val.label}`;
      }
      lines[0].series.push(
        {
          name: new Date(val.label),
          value: +val.y[0] || 0
        }
      );
      lines[1].series.push(
        {
          name: new Date(val.label),
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
