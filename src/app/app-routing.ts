import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { ChangePasswordComponent } from './shared/components/change-password/change-password.component';
import { ContactUsComponent } from './shared/components/contact-us/contact-us.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
    { path:'', component:HomeComponent },
    { path:'employer', loadChildren:'./employer/employer.module#EmployerModule' },
    { path:'jobseeker', loadChildren:'./job-seeker/job-seeker.module#JobSeekerModule' },
    { path:'changepassword', component:ChangePasswordComponent },
    { path:'register', component:RegisterComponent },
    { path:'contactus', component:ContactUsComponent },
    { path:'**', redirectTo:'' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
