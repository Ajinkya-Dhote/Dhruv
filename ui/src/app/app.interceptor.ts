import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpEvent, HttpResponse, HttpRequest, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize, tap } from 'rxjs/operators';
import { LoaderService } from '@services/loader.service';

@Injectable()
export class DhruvUrlInterceptor implements HttpInterceptor {
  count = 0;
  constructor(private loader: LoaderService) { }
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      this.loader.show()
      this.count++;
      return next.handle(httpRequest)
      .pipe ( tap (

                    event => console.log(event),

                    error => console.log( error )

                ), finalize(() => {

                    this.count--;

                    if ( this.count == 0 ) this.loader.hide ()
                })
            );

  }
}
