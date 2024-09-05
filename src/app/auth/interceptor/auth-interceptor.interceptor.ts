import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  // intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
  //   const authToken = this.authService.getToken();
  //   if (authToken) {
  //     request = request.clone({
  //       setHeaders: {
  //         Authorization: `Bearer ${authToken}`
  //       }
  //     });
  //   }
  //   return next.handle(request).pipe(
  //     catchError((error: HttpErrorResponse) => {
  //       // if (error.status === 401) {
  //       //   this.authService.userLogout();
  //       // }
  //       return throwError(error);
  //     })
  //   );
  // }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const authToken = this.authService.getToken();
  
    // Log the token to ensure it's being retrieved correctly
    console.log(authToken);
  
    if (authToken && authToken.trim()) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
    }
  
    return next.handle(request).pipe(
      catchError(error => {
        if (error.status === 401) {
          // Handle 401 Unauthorized error (e.g., log out the user or refresh token)
          // this.authService.logout();
        }
        return throwError(error);
      })
    );
  }
}
