import { Injectable } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, finalize } from 'rxjs';

@Injectable()
export class LoagingInterceptor implements HttpInterceptor {

  constructor(private spinner: NgxSpinnerService) {}
  

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

        /** spinner starts on init */
        this.spinner.show();

        // setTimeout(() => {
        //   /** spinner ends after 5 seconds */
        //   this.spinner.hide();
        // }, 5000);
    return next.handle(request).pipe(finalize(
      ()=>{
        this.spinner.hide();
      }
    ));
  }
}
