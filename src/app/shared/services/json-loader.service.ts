import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class JsonLoaderService {

  constructor(private http: Http) {

  }

  public getStates(): Observable<any> {
    return this.http.get("../../../assets/config/states.json")
                    .map((res:any) => res.json())
                    .catch((error: Response) => {
                      return Observable.throw(error.json());
                    });

  }

  public getLanguages(): Observable<any> {
    return this.http.get("../../../assets/config/languages.json")
                    .map((res:any) => res.json())
                    .catch((error: Response) => {
                      return Observable.throw(error.json());
                    });

  }

  public getYears(): Observable<any> {
    return this.http.get("../../../assets/config/years.json")
                    .map((res:any) => res.json())
                    .catch((error: Response) => {
                      return Observable.throw(error.json());
                    });

  }

  public getPositions(): Observable<any> {
    return this.http.get("../../../assets/config/positions.json")
                    .map((res:any) => res.json())
                    .catch((error: Response) => {
                      return Observable.throw(error.json());
                    });

  }

}
