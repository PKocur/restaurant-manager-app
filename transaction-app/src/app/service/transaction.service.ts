import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Transaction} from "../model/transaction";
import {Constants} from "../common/Constants";
import {AuthorizationUtil} from "../common/AuthorizationUtil";
import {Order} from "../model/order";
import {Meal} from "../model/meal";
import {TransactionForm} from "../model/transactionForm";

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  public transactionsUrl = Constants.API_ENDPOINT + 'transactions';
  public pendingOrdersUrl = Constants.API_ENDPOINT + 'orders';
  public ordersUrl = Constants.CUSTOMER_SERVICE_ENDPOINT + 'orders';
  public mealsUrl = Constants.MAIN_PANEL_API_ENDPOINT + 'meals';

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

  public getTransactions(): Observable<Transaction[]> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Transaction[]>(this.transactionsUrl, requestOptions);
  }

  public getTransaction(id: number): Observable<Transaction> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Transaction>(this.transactionsUrl + "/" + id, requestOptions);
  }

  public addTransaction(transaction: TransactionForm): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.post(this.transactionsUrl, transaction, requestOptions);
  }

  public getOrders(): Observable<Order[]> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Order[]>(this.pendingOrdersUrl, requestOptions);
  }

  public getOrdersByRecognitionId(recognitionId: string): Observable<Order[]> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    if (recognitionId.length > 0) {
      return this.httpClient.get<Order[]>(this.pendingOrdersUrl + "?recognitionId=" + recognitionId, requestOptions);
    } else {
      return this.httpClient.get<Order[]>(this.pendingOrdersUrl, requestOptions);
    }
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
}
