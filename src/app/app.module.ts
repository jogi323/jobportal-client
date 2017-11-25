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
import { CustomEditorComponent } from './shared/components/custom-editor/custom-editor.component';
//services
import { HaversineService } from "ng2-haversine";
import { ApiService } from './shared/services/api.service';
import { JwtService } from './shared/services/jwt.service';
import { UserService } from './shared/services/user.service';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoAuthGuardService } from './shared/services/no-auth-guard.service';
import { LoaderService } from './shared/services/loader.service';
import { PaginationService } from './shared/services/pagination.service';

import { ActivateUserComponent } from './activate-user/activate-user.component';
import { AcceptOfferComponent } from './offers/accept-offer/accept-offer.component';
import { DeclineOfferComponent } from './offers/decline-offer/decline-offer.component';
import { AcceptJobseekerComponent } from './offers/accept-jobseeker/accept-jobseeker.component';
import { RejectJobseekerComponent } from './offers/reject-jobseeker/reject-jobseeker.component';
import { JobseekerRtwComponent } from './offers/jobseeker-rtw/jobseeker-rtw.component';
import { JobseekerNrtwComponent } from './offers/jobseeker-nrtw/jobseeker-nrtw.component';

// import { SearchPipe } from './shared/pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    ActivateUserComponent,
    AcceptOfferComponent,
    DeclineOfferComponent,
    AcceptJobseekerComponent,
    RejectJobseekerComponent,
    JobseekerRtwComponent,
    JobseekerNrtwComponent
    // SearchPipe
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
    NoAuthGuardService,
    HaversineService,
    LoaderService,
    PaginationService
  ],
  bootstrap: [AppComponent],
  entryComponents:[ LoginComponent, CustomEditorComponent ]
})
export class AppModule { }
