import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../shared/services/employer.service';
@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions : any;

  constructor(public employerService : EmployerService) { 
    this.employerService.getTransactions().subscribe( res =>{
      this.transactions = res.data;
      console.log(res.data);
    })
  }

  ngOnInit() {
  }

}
