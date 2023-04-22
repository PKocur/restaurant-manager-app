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
export class MainPanelService {
  public mealsUrl = Constants.API_ENDPOINT + 'meals';
  public informationUrl = Constants.API_ENDPOINT + 'information';

  constructor(private httpClient: HttpClient) {
  }

  public getMealsByName(name: string): Observable<Meal[]> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    if (name.length > 0) {
      return this.httpClient.get<Meal[]>(this.mealsUrl + "?name=" + name, requestOptions);
    } else {
      return this.httpClient.get<Meal[]>(this.mealsUrl, requestOptions);
    }
  }

  public getMeal(mealId: number): Observable<Meal> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Meal>(this.mealsUrl + "/" + mealId, requestOptions);
  }

  public addMeal(meal: Partial<Meal>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.post(this.mealsUrl, meal, requestOptions);
  }

  public editMeal(mealId: number, meal: Partial<Meal>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.put(this.mealsUrl + "/" + mealId, meal, requestOptions);
  }

  public removeMeal(id: number): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken()
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.delete(this.mealsUrl + "/" + id, requestOptions);
  }

  public getInformation(): Observable<Information> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Information>(this.informationUrl, requestOptions);
  }

  public addInformation(information: Partial<Information>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.post(this.informationUrl, information, requestOptions);
  }

  public editInformation(information: Partial<Information>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + AuthorizationUtil.getBearerToken(),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.put(this.informationUrl, information, requestOptions);
  }
}
