import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';

import { AppRoutingModule } from './app-routing';

//Notifications Module
import { SimpleNotificationsModule } from 'angular2-notifications';

//shared modules import
import { SharedModule } from './shared/shared.module';
import { JsonLoaderService } from './shared/services/json-loader.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

//services
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { UserService } from './shared/services/user.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoAuthGuardService } from './shared/services/no-auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    RouterModule,
    BootstrapModalModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule,
    GooglePlaceModule,
    SimpleNotificationsModule.forRoot()
  ],
  providers: [ 
    JsonLoaderService,
    ApiService,
    JwtService,
    UserService,
    AuthGuardService,
    NoAuthGuardService
  ],
  bootstrap: [AppComponent],
  entryComponents:[ LoginComponent ]
})
export class AppModule { }
