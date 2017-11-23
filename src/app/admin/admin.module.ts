import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '../shared/shared.module';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminService } from '../shared/services/admin.service';

import { AdminComponent } from './admin.component';
import { ManagePositionsComponent } from './components/manage-positions/manage-positions.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule,
    Ng2SmartTableModule
  ],
  declarations: [AdminComponent, ManagePositionsComponent, ManageUsersComponent, ViewUserComponent],
  providers:[ 
    AdminService
  ]
})
export class AdminModule { }
