import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {ScheduleModule, DialogModule, CalendarModule, ToggleButtonModule, DragDropModule, ButtonModule, InputTextareaModule, CheckboxModule, InputTextModule, SelectButtonModule} from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';            //api
import 'fullcalendar';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { JobSeekerComponent } from './job-seeker.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkScheduleComponent } from './components/work-schedule/work-schedule.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { ViewProfileComponent } from './components/view-profile/view-profile.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { ProfileComponent } from './components/profile/profile.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    JobSeekerRoutingModule,
    ScheduleModule, DialogModule, CalendarModule, ToggleButtonModule, DragDropModule, ButtonModule, InputTextareaModule, CheckboxModule, InputTextModule, SelectButtonModule
  ],
  declarations: [
    JobSeekerComponent, 
    DashboardComponent, 
    WorkScheduleComponent, 
    UpdateProfileComponent, ViewProfileComponent, JobOffersComponent, ProfileComponent
  ]
})
export class JobSeekerModule { }
