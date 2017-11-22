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
    { path:'', component:HomeComponent,canActivate:[NoAuthGuardService] },
    { path:'confirm/:id', component:ActivateUserComponent,canActivate:[NoAuthGuardService] },
    { path:'employer', 
      loadChildren:'./employer/employer.module#EmployerModule',
      canActivate:[AuthGuardService] 
    },
    { path:'jobseeker', loadChildren:'./job-seeker/job-seeker.module#JobSeekerModule',canActivate:[AuthGuardService] },
    { path:'changepassword', component:ChangePasswordComponent,canActivate:[AuthGuardService] },
    { path:'forgotpassword/:id', component:ForgotPasswordComponent,canActivate:[NoAuthGuardService] },
    { path:'register',component:RegisterComponent ,canActivate:[NoAuthGuardService]},
    { path:'contactus', component:ContactUsComponent },
    { path:'acceptoffer/:id', component:AcceptOfferComponent },
    { path:'rejectoffer/:id', component:DeclineOfferComponent },
    { path:'acceptjobseeker/:id', component:AcceptJobseekerComponent },
    { path:'rejectjobseeker/:id', component:RejectJobseekerComponent },
    { path:'jobseekerrtw/:id', component:JobseekerRtwComponent },
    { path:'jobseekernrtw/:id', component:JobseekerNrtwComponent },    
    { path:'**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
