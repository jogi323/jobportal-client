import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { AdminService } from '../../../shared/services/admin.service';
// import { Position } from '../../../shared/models/position.model';
import { LoaderService } from '../../../shared/services/loader.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { CustomEditorComponent } from '../../../shared/components/custom-editor/custom-editor.component'

@Component({
  selector: 'app-manage-positions',
  templateUrl: './manage-positions.component.html',
  styleUrls: ['./manage-positions.component.css']
})
export class ManagePositionsComponent implements OnInit {

  source: LocalDataSource;
  Position: any;

  constructor(
    private adminService: AdminService,
    private loaderService: LoaderService,
        private notificationsService: NotificationsService,

  ) { 
    this.loaderService.display(true);
    this.initPositions();
  }
  initPositions(){
    this.adminService.getPositions().subscribe(
      res => {
        this.loaderService.display(false);
        this.source = new LocalDataSource(res.data)
      }, err => {
        this.loaderService.display(false);
      }
    )
  }
  onSaveConfirm(event) {
    this.loaderService.display(true);
    const data = {
      _id: event.newData._id,
      Position_Name: event.newData.Position_Name,
      Date_Submitted: new Date()
    }
    if (window.confirm('Are you sure you want to save?')) {
      this.adminService.updatePosition(data).subscribe(
        res => {
          this.loaderService.display(false);
          this.notificationsService.success(
            'Success',
            res.message,
            environment.options
          );
          // event.newData['name'] += event.newData.name;
          // event.confirm.resolve(event.newData);
        },
        err => {
          console.log(err);
          this.loaderService.display(false);
          this.notificationsService.error(
            err.title,
            err.error.message,
            environment.options
          );
        }
      )

    } else {
      event.confirm.reject();
      this.loaderService.display(false);
      
    }
  }
  onDeleteConfirm(event) {
    this.loaderService.display(true);
    const positionId = event.data._id
    if (window.confirm('Are you sure you want to delete?')) {
      this.adminService.deletePosition(positionId).subscribe(
        res => {
          this.initPositions();
          this.loaderService.display(false);
        },
        err => {
          this.loaderService.display(false);
        }
      )
    } else {
      event.confirm.reject();
      this.loaderService.display(false);   
    }
  }
  onCreateConfirm(event) {
    this.loaderService.display(true);
    const data = {
      Position_Name: event.newData.Position_Name,
      Date_Submitted: new Date()
    }
    if (window.confirm('Are you sure you want to create?')) {
      this.adminService.savePosition(data).subscribe(
        res => {
          this.initPositions();
          this.loaderService.display(false);
        },
        err => {
          console.log(err)
          this.loaderService.display(false);

        }
      )

    } else {
      event.confirm.reject();
      this.loaderService.display(false);
      
    }
  }
  ngOnInit() {
    
  }

  settings = {
    columns: {
      _id: {
        title: 'Position Id',
        width: '30%',
        editable: false,
        filter: false,
        type: 'html',
        editor: {
          type: 'custom',
          component: CustomEditorComponent,
        },
      },
      Position_Name: {
        title: 'Position Name',
        filter: false
      }
    },
    actions: {
      edit: true,
      delete: true,
      position: 'right'
    },
    delete: {
      confirmDelete: true
    },
    add: {
      confirmCreate: true
    },
    edit: {
      confirmSave: true
    },
    // hideSubHeader: true,
    noDataMessage: "No data Found",
    mode: 'inline',
    pager: {
      display: true,
      perPage: 10
    }
  };

}
