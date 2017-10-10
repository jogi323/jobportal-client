import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { AppRoutingModule } from './app-routing';

//shared modules import
import { SharedModule } from './shared/shared.module';
import { JsonLoaderService } from './shared/services/json-loader.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    SharedModule,
    FormsModule,
    RouterModule,
    BootstrapModalModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpModule
  ],
  providers: [ JsonLoaderService ],
  bootstrap: [AppComponent],
  entryComponents:[ LoginComponent ]
})
export class AppModule { }
