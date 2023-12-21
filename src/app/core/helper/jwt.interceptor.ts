
import {finalize, tap} from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { environment } from 'src/environment/environment';
import {
 HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpResponse,
 HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Router} from "@angular/router";
import { LoaderService } from '../services/loader.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  activeRequests = 0;
  apiUrl=environment.API_URL+'api/v1/Chat/Messages'
  constructor (
    private route: Router,
    private loaderService: LoaderService
  ) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let token = JSON.parse(localStorage.getItem('token') || '{}');
        if (token) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        if(this.activeRequests === 0){
          if(request.url==this.apiUrl && request.method=="POST"){
            this.loaderService.setLoader(false);
          }else{
            this.loaderService.setLoader(true);
          }
        }
        this.activeRequests++;

        return next.handle(request).pipe(
        tap(
          (event) => {
          },
          (error: any) => {
            if(error.status === 403){
              this.route.navigate(['/portal/unauthorized']);
            }
            if(error.status === 401){
              localStorage.removeItem('user');
              localStorage.removeItem('menu');
              localStorage.removeItem('menuResponse');
              localStorage.removeItem('rememberComp');
              localStorage.removeItem('token');
              this.route.navigate(['/']);
            }
          }
        ),
        finalize(()=> {
          this.stopLoader();
        }));
    }

    stopLoader(){
      this.activeRequests--;
      if(this.activeRequests === 0){
        this.loaderService.setLoader(false);
      }
    }
}
