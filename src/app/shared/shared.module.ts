import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReCaptchaModule } from 'angular2-recaptcha';


import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CustomEditorComponent } from './components/custom-editor/custom-editor.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReCaptchaModule
  ],
  exports: [
    TopNavComponent,
    FooterComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    ContactUsComponent,
  ],
  declarations: [
    TopNavComponent, 
    FooterComponent, 
    PageNotFoundComponent,
    ChangePasswordComponent,
    ContactUsComponent,
    ForgotPasswordComponent,
    CustomEditorComponent,
  ]
})
export class SharedModule { }
