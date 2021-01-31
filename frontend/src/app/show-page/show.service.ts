import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import { Show } from './show.model'
import { AuthService } from '../auth/auth.service';
import { UIService } from '../shared/ui.service';
import { environment } from '../../environments/environment';

@Injectable()
export class ShowService {

    constructor(private http : HttpClient,
                private authService: AuthService,
                private uiService: UIService
    ) {}

    private static _handleError(err: HttpErrorResponse | any) {
        return Observable.throw(err.message || 'Error: Unable to complete request.');
    }

    getData() {
        return this.http.get<Show[]>(`${environment.apiUrl}/movies`);
    }

    getUser(){
        return this.authService.getCurrentUser();
    }

    createReview(user: any) {
        return this.http.post(`${environment.apiUrl}/addreview`, user).subscribe(res => {
            this.uiService.showSnackbar("Thank you for your comments.", null, 3000);    
        }); 
    }



}