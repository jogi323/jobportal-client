import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { TextMaskModule } from 'angular2-text-mask';
import {GooglePlaceModule} from 'ng2-google-place-autocomplete';
import {ScheduleModule, DialogModule, CalendarModule, ToggleButtonModule, DragDropModule, ButtonModule, InputTextareaModule, CheckboxModule, InputTextModule, SelectButtonModule} from 'primeng/primeng';
import {AccordionModule} from 'primeng/primeng';     //accordion and accordion tab
import {MenuItem} from 'primeng/primeng';            //api
import 'fullcalendar';

import { JobSeekerRoutingModule } from './job-seeker-routing.module';
import { JobseekerService } from '../shared/services/jobseeker.service';
import { JobSeekerComponent } from './job-seeker.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { WorkScheduleComponent } from './components/work-schedule/work-schedule.component';
import { JobOffersComponent } from './components/job-offers/job-offers.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    JobSeekerRoutingModule,
    ScheduleModule, 
    GooglePlaceModule,
    DialogModule, 
    CalendarModule, 
    ToggleButtonModule, 
    DragDropModule, 
    ButtonModule, 
    InputTextareaModule, 
    CheckboxModule, 
    InputTextModule, 
    SelectButtonModule,
    SharedModule,
    MultiselectDropdownModule,
    TextMaskModule
  ],
  declarations: [
    JobSeekerComponent, 
    DashboardComponent, 
    WorkScheduleComponent, 
    JobOffersComponent, 
    ProfileComponent,
  ],
  providers : [
    JobseekerService
  ]
})
export class JobSeekerModule { }
