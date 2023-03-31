import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meal} from "../model/meal";
import {Constants} from "../common/Constants";
import {AuthorizationUtil} from "../common/AuthorizationUtil";

@Injectable({
  providedIn: 'root'
})
export class MainPanelService {
  public mealsUrl = Constants.API_ENDPOINT + 'meals';

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
}
