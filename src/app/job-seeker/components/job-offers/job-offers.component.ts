import { Component, OnInit } from '@angular/core';
import { NotificationsService } from 'angular2-notifications';
import { environment } from '../../../../environments/environment';
import { LoaderService } from '../../../shared/services/loader.service';
import { JobseekerService } from '../../../shared/services/jobseeker.service';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-job-offers',
  templateUrl: './job-offers.component.html',
  styleUrls: ['./job-offers.component.css']
})
export class JobOffersComponent implements OnInit {
  offers: any[];
  // array of all items to be paged
  private allItems: any[];

  // pager object
  pager: any = {};

  // paged items
  pagedItems: any[];
  constructor(
    private notificationsService: NotificationsService,
    private loaderService: LoaderService,
    private jobseekerService: JobseekerService,
    private paginationService: PaginationService
  ) {
    this.loaderService.display(true);
    this.jobseekerService.getOffers().subscribe(res => {
      this.offers = res.data;
      // set items to json response
      this.allItems = res.data;

      // initialize to page 1
      this.setPage(1);
      this.loaderService.display(false);
    },
      err => {
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
