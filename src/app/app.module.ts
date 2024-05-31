import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductModule } from './product/product.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { CartModule } from './cart/cart.module';
import { LoginModule } from './login/login.module';
import { LogoutProcessComponent } from './logout-process/logout-process.component';
import { HttpIntercepterBasicAuthService } from './service/http-intercepter-basic-auth.service';
import { MatDialogModule,MatDialogRef } from '@angular/material/dialog';
import { ProductService } from './product/product.service';

@NgModule({
  declarations: [
    AppComponent,
    LogoutProcessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProductModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    CartModule,
    LoginModule,
    MatDialogModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
    {provide : HTTP_INTERCEPTORS,useClass : HttpIntercepterBasicAuthService, multi: true},
    {
      provide: MatDialogRef,
      useValue: {},
      useClass : ProductService
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
