import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/catch';
import { User } from './user.model';
import { AuthSignupData, AuthLoginData } from './auth-data.model';
import { UIService } from '../shared/ui.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { Show } from '../show-page/show.model';

@Injectable()
export class AuthService {
    user_url : string = `http://0.0.0.0:5000/`;
    isLoading: Observable<boolean>;
    authChange = new Subject<boolean>();
    currentUser: object;

    constructor(private router: Router,
                private http : HttpClient ,
                private uiService: UIService               
    ) {}

   /*  private static _handleError(err: HttpErrorResponse | any) {
        return Observable.throw(err.message || 'Error: Unable to complete request.');
    } */
    
    registerUser(authData: AuthSignupData) {     
        
        return this.http.post(`${environment.apiUrl}/user`, authData)
        .subscribe(res => {
            this.router.navigate(['/login'])
        })
        this.authChange.next(true);
    }

    loginUser(authData: AuthLoginData) {
        return this.http.post(`${environment.apiUrl}/login`, authData)
        .subscribe(res => {   
            localStorage.setItem('token', JSON.stringify(res['token']));
            this.currentUser = res['user']
            this.router.navigate(['/movie']);
            this.authChange.next(true);
          }, error => {
            let errorMessage: string = error.status == 401 ? 'Could not verify' : error.message
            this.uiService.showSnackbar(errorMessage, null, 3000);
            this.authChange.next(false);  
          })
    }

    logout() {
        localStorage.setItem('user', '');
        this.router.navigate(['/login']);
        this.authChange.next(false);
    }

    getCurrentUser() {
        return this.currentUser;
    }
}