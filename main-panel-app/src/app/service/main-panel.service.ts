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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJyb2xlcyI6IlJPTEVfQURNSU4iLCJpc3MiOiJyZXN0YXVyYW50X21hbmFnZXIiLCJpYXQiOjE2Nzk3MzgwOTQsImVtYWlsIjoiYWJjQGFiYy5jb20ifQ.TM4tL95v5UxuNsjGLNhI1K8xmTyb3ToKz19Y7xCBX6o',
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
    };
    return this.httpClient.get<Meal[]>(this.baseUrl, requestOptions);
  }

  public addMeal(meal: Partial<Meal>): Observable<any> {
    const headers = {
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJyb2xlcyI6IlJPTEVfYWRtaW4iLCJpc3MiOiJyZXN0YXVyYW50X21hbmFnZXIiLCJpYXQiOjE2Nzk3NTQyNzgsImVtYWlsIjoiYWJjQGFiYy5jb20ifQ._r2FTIXkrTehdp8Es6VEmoE2EmYnxI0KaqtVg_Q8LoQ',
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
      'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJVc2VyIERldGFpbHMiLCJyb2xlcyI6IlJPTEVfYWRtaW4iLCJpc3MiOiJyZXN0YXVyYW50X21hbmFnZXIiLCJpYXQiOjE2Nzk3NTQyNzgsImVtYWlsIjoiYWJjQGFiYy5jb20ifQ._r2FTIXkrTehdp8Es6VEmoE2EmYnxI0KaqtVg_Q8LoQ'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.delete(this.baseUrl + "/" + id, requestOptions);
  }
}
