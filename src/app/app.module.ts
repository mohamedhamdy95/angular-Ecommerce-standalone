import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import{ HTTP_INTERCEPTORS, HttpClientModule} from'@angular/common/http'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { ToastrModule } from 'ngx-toastr';
import { MyhttpInterceptor } from './core/interceptors/myhttp.interceptor';
import { LoagingInterceptor } from './core/interceptors/loaging.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    RouterModule,
    NgxSpinnerModule,
    ToastrModule.forRoot({
      timeOut: 1500
    }),
  ],
  providers: [
    {provide : HTTP_INTERCEPTORS,useClass:MyhttpInterceptor,multi:true},
    {provide : HTTP_INTERCEPTORS , useClass:LoagingInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
