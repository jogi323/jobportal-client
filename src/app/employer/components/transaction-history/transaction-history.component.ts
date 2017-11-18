import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../shared/services/employer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions : any;

  constructor(public employerService : EmployerService,private notificationsService: NotificationsService,    private loaderService: LoaderService
) { 
    this.loaderService.display(true);          
    this.employerService.getTransactions().subscribe( res =>{
      console.log(res);
      this.transactions = res.data;
      this.loaderService.display(false);          
    },err => {
      this.loaderService.display(false);          
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
