import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { AuthService } from '../auth/auth.service';
import { UIService } from '../shared/ui.service';
import { environment } from '../../environments/environment';
import { ChartModel } from './chart.modal';

@Injectable()
export class AnalyticsService {

    constructor(private http : HttpClient,
                private authService: AuthService,
                private uiService: UIService
    ) {}


    getUser(){
        return this.authService.getCurrentUser();
    }

    groupBy() {
        return this.http.get(`${environment.apiUrl}/groupby`);
    }

    buildChart(data: any): ChartModel  {
        let label: string[] = [];
        let count: number[] = [];
        data.forEach(element => {
            label.push(element["type"])
            count.push(element["count"])
        });
        return {labels: label, counts: count}
    }

}