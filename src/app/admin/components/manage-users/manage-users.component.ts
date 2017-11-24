import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';

import { AdminService } from '../../../shared/services/admin.service';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  usersList: any;
  source: LocalDataSource;

  constructor(
    private adminService: AdminService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.loaderService.display(true);

    this.adminService.getAllUsers().subscribe(
      res => {
        console.log(res);
        res.data.forEach(user => {
          if(user.Position){
            user.Position_Name = user.Position.Position_Name
          }
        });
        this.usersList = res.data
        this.loaderService.display(false);
        this.source = new LocalDataSource(this.usersList)
      },
      err => {
        this.loaderService.display(false);
        console.log(err);
      }
    );
  }
  onCustom(event) {
    this.router.navigate(['admin/viewuser'], { queryParams: { id: event.data._id } });
  }
  ngOnInit() {

  }
  settings = {
    columns: {
      Email_Address: {
        title: 'Email Address'
      },
      Position_Name: {
        title: 'Position'
      },
      State: {
        title: 'Location'
      },
      Experience: {
        title: 'Experience'
      },
      userType: {
        title: 'User Type'
      },
      Nr_of_Operations: {
        title: 'No of Operatiories'
      },
      Nr_of_Staff: {
        title: 'No of Employee'
      }
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
      custom: [
        {
          name: 'view',
          title: 'view ',
        },
      ],
    },
  };
}
