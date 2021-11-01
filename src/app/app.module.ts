import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FileComponent } from './file/file.component';
import { FileUploadModule  } from 'ng2-file-upload';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { TokenInterceptorService } from './services/Interceptors/token-interceptor.service';
import { ErrorInterceptorService } from './services/Interceptors/error-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    FileComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FileUploadModule, 
  ],
  providers: [AuthService, AuthGuardService, {provide:HTTP_INTERCEPTORS, useClass:TokenInterceptorService, multi: true}, {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
