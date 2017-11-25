import { Component, OnInit } from '@angular/core';
import { EmployerService } from '../../../shared/services/employer.service';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.css']
})
export class TransactionHistoryComponent implements OnInit {

  transactions: any;
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(public employerService: EmployerService, private notificationsService: NotificationsService, private loaderService: LoaderService, private paginationService: PaginationService
  ) {
    this.loaderService.display(true);
    this.employerService.getTransactions().subscribe(res => {
      this.transactions = res.data;
      // set items to json response
      this.allItems = res.data;

      // initialize to page 1
      this.setPage(1);
      this.loaderService.display(false);
    }, err => {
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
  setPage(page: number) {
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.pager = this.paginationService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
  }
}
