import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JobSeekerComponent } from './job-seeker.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkScheduleComponent } from './components/work-schedule/work-schedule.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { ProfileComponent } from './components/profile/profile.component';

const routes: Routes = [
  {
    path:'', 
    component:JobSeekerComponent, 
    children:[
      {path:'', redirectTo:'dashboard'},
      {path:'dashboard', component:DashboardComponent},
      {path:'schedule', component:WorkScheduleComponent},
      // {path:'update', component:UpdateProfileComponent},
      {path:'profile', component:ProfileComponent},
      {path:'joboffers', component:JobOffersComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobSeekerRoutingModule { }
