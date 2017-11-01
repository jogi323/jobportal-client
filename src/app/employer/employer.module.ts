import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';

import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobSeekerSearchComponent } from './components/job-seeker-search/job-seeker-search.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { PriorJobOfferComponent } from './components/prior-job-offer/prior-job-offer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    EmployerRoutingModule,
    CalendarModule,
    GooglePlaceModule
  ],
  declarations: [
    EmployerComponent, 
    DashboardComponent,
    JobSeekerSearchComponent,
    TransactionHistoryComponent,
    PriorJobOfferComponent,
    PaymentComponent,
    ProfileComponent],
  providers:[  ]
})
export class EmployerModule { }
