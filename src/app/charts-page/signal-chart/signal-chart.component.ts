import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label, Color } from 'ng2-charts';
import { ArednApi } from '../../../ArednApi';

@Component({
  selector: 'aredn-signal-chart',
  templateUrl: './signal-chart.component.html',
  styleUrls: ['./signal-chart.component.scss']
})
export class SignalChartComponent implements OnInit, OnChanges {

  @Input() data: ArednApi.SignalResult[] = [];

  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: ChartOptions = {
    spanGaps: true,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        id: "signal",
        scaleLabel: {
          labelString: "Signal Strength (dBm)",
          display: true
        },
        position: "left",
        ticks: {
          reverse: false,
          min: 0,
          max: 100,
          beginAtZero: false,
          callback: function (value, index, values) {
            //faking -dBm values here because ChartJS always draws the fill from zero to our data point
            return "-" + (100 - value) + " dBm"
          }
        }
      },
      {
        id: "rate",
        scaleLabel: {
          labelString: "TX/RX Rate (Mbps)",
          display: true
        },
        position: "right",
        ticks: {
          reverse: false,
          min: 0,
          max: 20,
          beginAtZero: false,
          callback: function (value, index, values) {
            return value + " Mbps";
          }
        }
      }]
    },
    tooltips: {
      callbacks: {
        label: function (tooltipItem, data) {
          let dataset = data.datasets[tooltipItem.datasetIndex];
          let label = dataset.label || '';
          let yAxisID = dataset.yAxisID || '';

          if (yAxisID && yAxisID == 'rate') {
            if (label) {
              label += ': ';
            }
            label += tooltipItem.yLabel + ' Mbps';
            return label;
          }
          else if (yAxisID && yAxisID == 'signal') {
            if (label) {
              label += ': ';
            }
            label += "-" + (100 - parseInt(tooltipItem.yLabel)) + " dBm";
            return label;
          }
        }
      }
    }
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,0,255,0.3)',
    },
    {
      borderColor: 'black',
      backgroundColor: 'rgba(0,255,0,0.3)',
    }
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  constructor() { }

  pluck<T, K extends keyof T>(objs: T[], key: K): T[K][] {
    return objs.map(obj => obj[key]);
  }

  updateChart() {
    const margin = this.pluck(this.data, 'm');
    const tx = this.pluck(this.data, 'tx_rate').map(val => parseInt(val) || 0);
    const rx = this.pluck(this.data, 'rx_rate').map(val => parseInt(val) || 0);
    const labels = this.pluck(this.data, 'label');

    this.lineChartData = [
      { data: tx, label: 'TX Rate', yAxisID: 'rate' },
      { data: rx, label: 'RX Rate', yAxisID: 'rate' },
      { data: margin, label: 'Signal', yAxisID: 'signal' }
    ];
    this.lineChartLabels = labels;

  }

  ngOnInit() {
    this.updateChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateChart();
  }

}
