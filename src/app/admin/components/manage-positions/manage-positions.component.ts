import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AdminService } from '../../../shared/services/admin.service';
// import { Position } from '../../../shared/models/position.model';

@Component({
  selector: 'app-manage-positions',
  templateUrl: './manage-positions.component.html',
  styleUrls: ['./manage-positions.component.css']
})
export class ManagePositionsComponent implements OnInit {

  source: LocalDataSource;
  Position:any;

  constructor(
    private adminService: AdminService,
  ) { }

  onSaveConfirm(event) {

    const data = {
      _id: event.newData._id,
      Position_Name : event.newData.Position_Name,
      Date_Submitted: new Date()
    }
    if (window.confirm('Are you sure you want to save?')) {
      this.adminService.updatePosition(data).subscribe(
        res => {
          console.log(res)
          // event.newData['name'] += event.newData.name;
          event.confirm.resolve(event.newData);
        },
        err => {
          console.log(err)
        }
      )

    } else {
      event.confirm.reject();
    }
  }

  onCreateConfirm(event) {
    console.log(event)
    const data = {
      Position_Name : event.newData.Position_Name,
      Date_Submitted: new Date()
    }
    if (window.confirm('Are you sure you want to create?')) {
      this.adminService.savePosition(data).subscribe(
        res => {
          console.log(res)
          // event.newData['name'] += event.newData.name;
          event.confirm.resolve(event.newData);
        },
        err => {
          console.log(err)
        }
      )
      
    } else {
      event.confirm.reject();
    }
  }
  ngOnInit() {
    this.adminService.getPositions().subscribe(
      res => {
        this.source = new LocalDataSource(res.data)
      },err => {

      }
    )
  }

  settings = {
    columns: {
      _id: {
        title: 'Position Id',
        width:'30%',
        editable:false,  
        filter: false,
      },
      Position_Name: {
        title: 'Position Name',
        filter: false
      }
    },
    actions: {
      edit:true,
      delete:false,
      position:'right'
    },
    add:{
      confirmCreate:true
    },
    edit:{
      confirmSave:true
    },
    // hideSubHeader: true,
    noDataMessage: "No data Found",
    mode: 'inline',
    pager : {
      display : true,
      perPage:10
    }
  };
  
}
