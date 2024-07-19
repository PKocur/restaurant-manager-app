import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Constants} from "../common/Constants";
import {AuthorizationUtil} from "../common/AuthorizationUtil";
import {OrdersCount} from "../model/ordersCount";
import {TotalIncome} from "../model/totalIncome";
import {QuantitiesPerMeals} from "../model/QuantitiesPerMeals";
import {TransactionsStatuses} from "../model/transactionsStatuses";
import {OrdersPerHours} from "../model/ordersPerHours";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {
  public analyticsUrl = Constants.ANALYTICS_API_ENDPOINT;

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
    return this.httpClient.get<OrdersCount>(this.analyticsUrl + 'orders-count', requestOptions);
  }

  public getTotalIncome(): Observable<TotalIncome> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<TotalIncome>(this.analyticsUrl + 'total-income', requestOptions);
  }

  public getQuantitiesPerMeals(): Observable<QuantitiesPerMeals> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<QuantitiesPerMeals>(this.analyticsUrl + 'quantities-per-meals', requestOptions);
  }

  public getTransactionsStatuses(): Observable<TransactionsStatuses> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<TransactionsStatuses>(this.analyticsUrl + 'transactions-statuses', requestOptions);
  }

  public getOrdersPerHours(): Observable<OrdersPerHours> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<OrdersPerHours>(this.analyticsUrl + 'orders-per-hours', requestOptions);
  }
}
