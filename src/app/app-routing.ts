import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';

import { AuthGuardService } from './shared/services/auth-guard.service';
import { NoAuthGuardService } from './shared/services/no-auth-guard.service';

const routes: Routes = [
    { path:'', component:HomeComponent,canActivate:[NoAuthGuardService] },
    { path:'employer', loadChildren:'./employer/employer.module#EmployerModule',canActivate:[AuthGuardService] },
    { path:'jobseeker', loadChildren:'./job-seeker/job-seeker.module#JobSeekerModule',canActivate:[AuthGuardService] },
    { path:'changepassword', component:ChangePasswordComponent,canActivate:[NoAuthGuardService] },
    { path:'register', component:RegisterComponent ,canActivate:[NoAuthGuardService]},
    { path:'contactus', component:ContactUsComponent ,canActivate:[NoAuthGuardService] },
    { path:'**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
