import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobSeekerSearchComponent } from './components/job-seeker-search/job-seeker-search.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { PriorJobOfferComponent } from './components/prior-job-offer/prior-job-offer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path:'', 
    component:EmployerComponent,
    children:[
      {path:'', component:ProfileComponent},
      {path:'search', component:JobSeekerSearchComponent},
      // {path:'profile', component:ViewProfileComponent},
      {path:'transactionhistory', component:TransactionHistoryComponent},
      {path:'joboffers', component:PriorJobOfferComponent},
      {path:'payment', component:PaymentComponent},
      {path:'profile', component:ProfileComponent},
      {path:'changepassword',component:ChangePasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
