import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployerComponent } from './employer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { JobSeekerSearchComponent } from './components/job-seeker-search/job-seeker-search.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { PriorJobOfferComponent } from './components/prior-job-offer/prior-job-offer.component';
import { PaymentComponent } from './components/payment/payment.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path:'', 
    component:EmployerComponent, 
    children:[
      {path:'', component:DashboardComponent},
      {path:'search', component:JobSeekerSearchComponent},
      {path:'update', component:UpdateProfileComponent},
      // {path:'profile', component:ViewProfileComponent},
      {path:'history', component:TransactionHistoryComponent},
      {path:'joboffers', component:PriorJobOfferComponent},
      {path:'payment', component:PaymentComponent},
      {path:'profile', component:ProfileComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployerRoutingModule { }
