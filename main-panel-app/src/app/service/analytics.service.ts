import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meal} from "../model/meal";
import {Constants} from "../common/Constants";
import {AuthorizationUtil} from "../common/AuthorizationUtil";
import {Information} from "../model/information";
import {OrdersCount} from "../model/ordersCount";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  public analyticsUrl = Constants.ANALYTICS_API_ENDPOINT + 'orders-count';

  constructor(private httpClient: HttpClient) {
  }

  public getOrdersCount(): Observable<OrdersCount> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<OrdersCount>(this.analyticsUrl, requestOptions);
  }

}
