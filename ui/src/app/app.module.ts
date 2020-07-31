import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';

import { AppMaterialModule } from './material-module';
import { ServiceModule } from '@services/service.module';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { GreetingComponent } from './common/components/greeting/greeting.component';
import { ProductCardComponent } from './common/components/product-card/product-card.component';
import { QuantitySelectComponent } from './common/components/quantity-select/quantity-select.component';
import { CounterComponent } from './common/components/counter/counter.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BaseProductComponent } from './components/base-product/base-product.component';

import { DhruvUrlInterceptor } from "./app.interceptor";
import { QuantityDialogComponent } from './common/components/quantity-dialog/quantity-dialog.component';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    GreetingComponent,
    ProductCardComponent,
    QuantitySelectComponent,
    CounterComponent,
    BaseProductComponent,
    QuantityDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FlexLayoutModule,
    AppMaterialModule,
    ServiceModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [
      {
           provide: HTTP_INTERCEPTORS, useClass: DhruvUrlInterceptor, multi: true
      }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
