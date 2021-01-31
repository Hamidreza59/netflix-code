import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ChartModel } from '../chart.modal';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @ViewChild('chart')
  private chartRef: ElementRef;
  private chart: Chart;
  @Input() chartData: ChartModel;
  @Input() title: string;
 

  constructor() { }

  ngOnInit(): void {}

  
  ngAfterViewInit(): void {
    this.chart = this.buildChart()  
  }  

  buildChart() {
    let chart = new Chart(this.chartRef.nativeElement, {
      type: 'bar',
      
      data: {
        labels: this.chartData.labels,
        datasets: [
          {
            data: this.chartData.counts,
            label: this.title,
            borderColor: '#3cba9f',
            fill: false
          }
        ]
      },
      options: {
        legend: {
          display: true
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true
          }]
        }
      }
    })
    return chart;
  }

}
