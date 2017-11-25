import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { AdminService } from '../../../shared/services/admin.service';
import { UserService } from '../../../shared/services/user.service';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../../../shared/services/loader.service';
import { PaginationService } from '../../../shared/services/pagination.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  userId: String;
  userData: any = "";
  subscription: Subscription;
  userType: String;
  currentUser: any;
  // array of all items to be paged
  private allItems: any[];
  allOfferItems: any[];
  // pager object
  pager: any = {};
  offersPager: any = {};
  // paged items
  pagedItems: any[];
  offerPagedIntems: any[];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private adminService: AdminService,
    private userService: UserService,
    private loaderService: LoaderService,
    private paginationService: PaginationService

  ) {
    this.loaderService.display(true);
    this.subscription = userService.currentUser.subscribe(user => {
      this.userType = user.userType;
      this.currentUser = user;
    });
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.userId = params['id']
      if (this.userId) {
        this.initUserData();
      }
    });
  }
  initUserData(){
    this.adminService.getAllUserDetails(this.userId).subscribe(
      res => {
        this.userData = res.data;
        // set items to json response
        this.allItems = res.data.Payments_id;
        this.allOfferItems = res.data.Offers_id;
        // initialize to page 1
        this.setPage(1);
        this.offerPageSet(1);
        this.loaderService.display(false);
      }, err => {
        console.log(err)
        this.loaderService.display(false);
      }
    )
  }
  onChangeStatus(){
    this.adminService.changeUserStatus(this.userId).subscribe(
      res => {
        this.userData.Status = !this.userData.Status
        // this.initUserData();
      }
    )
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
  offerPageSet(page: number){
    if (page < 1 || page > this.pager.totalPages) {
      return;
    }

    // get pager object from service
    this.offersPager = this.paginationService.getPager(this.allOfferItems.length,page)
    // get current page of items
    this.offerPagedIntems = this.allOfferItems.slice(this.offersPager.startIndex, this.offersPager.endIndex + 1);
  }
  ngOnInit() {

  }

}
