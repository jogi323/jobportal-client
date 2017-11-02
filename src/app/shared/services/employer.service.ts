import { Injectable } from '@angular/core';
import { Http, Headers, Response } from "@angular/http";
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from './api.service';

@Injectable()
export class EmployerService {

  constructor(
    private apiService: ApiService,
  ) { }

  queryJobseekers(data){
    let path = 'availability/query'
    return this.apiService.post(path,data)
    .map(
      data => {
        return data;
      }
    )
  }

}
