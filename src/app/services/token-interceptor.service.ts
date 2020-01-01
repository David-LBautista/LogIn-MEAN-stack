import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http'
import { AuthService } from './auth.service';




@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  

  constructor(
    private auth: AuthService
  ) { }
  
  intercept(req, next) {
    const tokenize = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.auth.getToken()}`
      }
    })
    return next.handle(tokenize);
  }


}
