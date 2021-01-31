import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const isAuth = localStorage.getItem('token');
        const isApiUrl = request.url.startsWith(environment.apiUrl);

        if (isAuth && isApiUrl) {
            request = request.clone({
                setHeaders: {
                    'x-access-token': isAuth.replace(/"/g, "")
                }
            });
        }

        return next.handle(request);
    }
}