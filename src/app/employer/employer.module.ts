import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {CalendarModule} from 'primeng/primeng';

import { EmployerRoutingModule } from './employer-routing.module';
import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobSeekerSearchComponent } from './components/job-seeker-search/job-seeker-search.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
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
    CalendarModule
  ],
  declarations: [
    EmployerComponent, 
    DashboardComponent,
    JobSeekerSearchComponent,
    UpdateProfileComponent,
    ViewProfileComponent,
    TransactionHistoryComponent,
    PriorJobOfferComponent,
    PaymentComponent,
    ProfileComponent],
  providers:[  ]
})
export class EmployerModule { }
