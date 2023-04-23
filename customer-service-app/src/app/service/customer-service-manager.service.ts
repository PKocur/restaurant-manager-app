import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meal} from "../model/meal";
import {Constants} from "../common/Constants";
import {AuthorizationUtil} from "../common/AuthorizationUtil";
import {Order} from "../model/order";

@Injectable({
  providedIn: 'root'
})
export class CustomerServiceManager {
  public ordersUrl = Constants.API_ENDPOINT + 'orders';
  public mealsUrl = Constants.MAIN_PANEL_API_ENDPOINT + 'meals';
  public pendingOrdersUrl = Constants.TRANSACTION_API_ENDPOINT + 'orders';

  constructor(private httpClient: HttpClient) {
  }

  public getMeals(): Observable<Meal[]> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Meal[]>(this.mealsUrl, requestOptions);
  }

  public getMeal(id: number): Observable<Meal> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Meal>(this.mealsUrl + "/" + id, requestOptions);
  }

  public getPendingOrders(): Observable<Order[]> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Order[]>(this.pendingOrdersUrl, requestOptions);
  }

  public getOrder(id: number): Observable<Order> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Order>(this.ordersUrl + "/" + id, requestOptions);
  }

  public addOrder(order: Partial<Order>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.post(this.ordersUrl, order, requestOptions);
  }

  public editOrder(id: number, order: Partial<Order>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.put(this.ordersUrl + "/" + id, order, requestOptions);
  }

  public removeOrder(id: number): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken()
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.delete(this.ordersUrl + "/" + id, requestOptions);
  }
}
