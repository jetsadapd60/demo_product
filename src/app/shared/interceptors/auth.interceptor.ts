import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  intercept( req: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem('token');
    // https://apis.aigen.online/aiscript/idcard/v1

    if (token && (req.url !== "https://apis.aigen.online/aiscript/idcard/v1") && (req.url) !== "https://apis.aigen.online/aiface/face-compare/v1") {
      const cloned = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      });
      return next.handle(cloned);
    } else {
      return next.handle(req);
    }
  }

}
