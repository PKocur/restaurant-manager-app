import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Meal} from "../model/meal";

@Injectable({
  providedIn: 'root'
})
export class MainPanelService {

  public baseUrl = "http://localhost:8080/main-panel/meals";

  constructor(private httpClient: HttpClient) {
  }

  public getMeals(): Observable<Meal[]> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("bearerToken"),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Meal[]>(this.baseUrl, requestOptions);
  }

  public addMeal(meal: Partial<Meal>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("bearerToken"),
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.post(this.baseUrl, meal, requestOptions);
  }

  public removeMeal(id: number): Observable<any> {
    const headers = {
      'Authorization': 'Bearer ' + localStorage.getItem("bearerToken")
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.delete(this.baseUrl + "/" + id, requestOptions);
  }
}
