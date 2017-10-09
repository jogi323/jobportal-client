import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { TopNavComponent } from './components/top-nav/top-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    TopNavComponent,
    FooterComponent,
    PageNotFoundComponent,
    ChangePasswordComponent,
    ContactUsComponent
  ],
  declarations: [
    TopNavComponent, 
    FooterComponent, 
    PageNotFoundComponent,
    ChangePasswordComponent,
    ContactUsComponent
  ]
})
export class SharedModule { }
