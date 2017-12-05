import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobSeekerComponent } from './job-seeker.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkScheduleComponent } from './components/work-schedule/work-schedule.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';

const routes: Routes = [
  {
    path:'', 
    component:JobSeekerComponent,
    children:[
      {path:'', redirectTo:'profile', pathMatch: 'full'},
      {path:'dashboard', component:DashboardComponent, pathMatch: 'full'},
      {path:'schedule', component:WorkScheduleComponent, pathMatch: 'full'},
      // {path:'update', component:UpdateProfileComponent},
      {path:'profile', component:ProfileComponent, pathMatch: 'full'},
      {path:'joboffers', component:JobOffersComponent, pathMatch: 'full'},
      {path:'changepassword',component:ChangePasswordComponent, pathMatch: 'full'}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
