import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { ForgotPasswordComponent } from './shared/components/forgot-password/forgot-password.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';
import { ActivateUserComponent } from './activate-user/activate-user.component';

//offers related routes
import { AcceptOfferComponent } from './offers/accept-offer/accept-offer.component';
import { DeclineOfferComponent } from './offers/decline-offer/decline-offer.component';
import { AcceptJobseekerComponent } from './offers/accept-jobseeker/accept-jobseeker.component';
import { RejectJobseekerComponent } from './offers/reject-jobseeker/reject-jobseeker.component';
import { JobseekerRtwComponent } from './offers/jobseeker-rtw/jobseeker-rtw.component';
import { JobseekerNrtwComponent } from './offers/jobseeker-nrtw/jobseeker-nrtw.component';
import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoAuthGuardService } from './shared/services/no-auth-guard.service';

const routes: Routes = [
    { path:'', component:HomeComponent,canActivate:[NoAuthGuardService], pathMatch: 'full' },
    { path:'confirm/:id', component:ActivateUserComponent,canActivate:[NoAuthGuardService],
    pathMatch: 'full' },
    { 
      path:'employer', 
      loadChildren:'./employer/employer.module#EmployerModule',
      canActivate:[AuthGuardService] 
    },
    { 
      path:'admin', 
      loadChildren:'./admin/admin.module#AdminModule',
      canActivate:[AuthGuardService] 
    },
    { path:'jobseeker', loadChildren:'./job-seeker/job-seeker.module#JobSeekerModule',canActivate:[AuthGuardService] },
    { path:'changepassword', component:ChangePasswordComponent,canActivate:[AuthGuardService],pathMatch: 'full' },
    { path:'forgotpassword/:id', component:ForgotPasswordComponent,canActivate:[NoAuthGuardService] ,pathMatch: 'full'},
    { path:'register',component:RegisterComponent ,canActivate:[NoAuthGuardService]},
    { path:'contactus', component:ContactUsComponent, pathMatch: 'full' },
    { path:'acceptoffer/:id', component:AcceptOfferComponent, pathMatch: 'full' },
    { path:'rejectoffer/:id', component:DeclineOfferComponent, pathMatch: 'full' },
    { path:'acceptjobseeker/:id', component:AcceptJobseekerComponent, pathMatch: 'full' },
    { path:'rejectjobseeker/:id', component:RejectJobseekerComponent, pathMatch: 'full' },
    { path:'jobseekerrtw/:id', component:JobseekerRtwComponent, pathMatch: 'full' },
    { path:'jobseekernrtw/:id', component:JobseekerNrtwComponent, pathMatch: 'full'  },    
    { path:'**', redirectTo:'' , pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
