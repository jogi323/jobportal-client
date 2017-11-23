import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin.component';
import { ChangePasswordComponent } from '../shared/components/change-password/change-password.component';
import { ManagePositionsComponent } from './components/manage-positions/manage-positions.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ViewUserComponent } from './components/view-user/view-user.component';

const routes: Routes = [
  {
    path:'', 
    component:AdminComponent,
    children:[
        {path:'',redirectTo:'positions'},
        {path:'positions',component:ManagePositionsComponent},
        {path:'users',component:ManageUsersComponent},
        {path:'viewuser',component:ViewUserComponent},
        {path:'changepassword',component:ChangePasswordComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
