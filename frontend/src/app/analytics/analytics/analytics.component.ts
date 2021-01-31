import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../analytics.service';

@Component({
  selector: 'app-analytics',
  templateUrl: './analytics.component.html',
  styleUrls: ['./analytics.component.scss']
})
export class AnalyticsComponent implements OnInit {

  charts = [];

  constructor(private analyticsService: AnalyticsService) { }

  ngOnInit(): void {
    this.analyticsService.groupBy()
      .subscribe(res => {      
        this.charts.push({data: this.analyticsService.buildChart(res['content']), title: 'Type of movies'});        
        this.charts.push({data: this.analyticsService.buildChart(res['year']), title: 'Number of movies per year'});        
        this.charts.push({data: this.analyticsService.buildChart(res['rating']), title: 'Ratings'});
    })
  }

}
