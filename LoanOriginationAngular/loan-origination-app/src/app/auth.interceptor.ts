import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
 
@Injectable({
  providedIn: 'root'
})
export class AuthIntercepterService implements HttpInterceptor {
 
  constructor(private router:Router) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
 
    let authReq = req;
    let token = localStorage.getItem('token');
    if (token) {
      authReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      });
    }
    else {
      this.router.navigate(['/login']);
    }
    return next.handle(authReq).pipe(catchError((error) => {
      if (error.status === 401) {
        this.router.navigate(['/login']);
      }
      return throwError(error);
    }));
  }
}
 
 