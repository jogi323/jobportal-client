import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../shared/services/employer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions : any;

  constructor(public employerService : EmployerService,private notificationsService: NotificationsService) { 
    this.employerService.getTransactions().subscribe( res =>{
      this.transactions = res.data;
    },err => {
      this.notificationsService.error(
            err.title,
            err.error.message,
            environment.options
          )
    });
  }

  ngOnInit() {
  }

}
