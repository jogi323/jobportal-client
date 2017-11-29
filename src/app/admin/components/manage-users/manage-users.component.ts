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
  positionsList: any[] = [];

  constructor(
    private adminService: AdminService,
    private router: Router,
    private loaderService: LoaderService
  ) {
    this.loaderService.display(true);

    this.initAllUsers()
  }
  initAllUsers(){
    this.adminService.getAllUsers().subscribe(
      res => {
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
  filterNo0fOperations(){
    console.log("asd");
    // this.initAllUsers()
  }
  ngOnInit() {
    this.adminService.getPositions().subscribe(
      res => {
        this.positionsList = res.data.map(position =>({value:position.Position_Name,title:position.Position_Name}));
        this.settings = {
          columns: {
            Email_Address: {
              title: 'Email Address',
              width: '20%'
            },
            Position_Name: {
              title: 'Position',
              width: '20%',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: this.positionsList,
                },
              },
            },
            State: {
              title: 'Location',
              width: '10%'
            },
            Experience: {
              title: 'Experience',
              width: '10%'
            },
            userType: {
              title: 'User Type',
              width: '20%',
              filter: {
                type: 'list',
                config: {
                  selectText: 'Select...',
                  list: [
                    { value: 'employer', title: 'employer' },
                    { value: 'jobseeker', title: 'jobseeker' }
                  ],
                },
              },
            },
            Nr_of_Operations: {
              title: 'No of Operatiories',
              width: '10%',
              filterFunction(cell?: any, search?: string): boolean {          
                if (cell >= search || search === '') {
                  return true;
                } else {
                  return false;
                }          
              }
            },
            Nr_of_Staff: {
              title: 'No of Employee',
              width: '10%',
              filterFunction(cell?: any, search?: string): boolean {          
                if (cell >= search || search === '') {
                  return true;
                } else {
                  return false;
                }          
              }
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
      },err => {

      }
    )
  }
  settings: any;
}
