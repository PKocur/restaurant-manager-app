import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginForm} from "../model/loginForm";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  public baseUrl = "http://localhost:8080/main-panel/";

  constructor(private httpClient: HttpClient) { }

  public logIn(loginForm: LoginForm): Observable<any> {
    const headers = {
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.post(this.baseUrl + "users/login", loginForm, requestOptions);
  }

  public logOut() {
    localStorage.removeItem("bearerToken")
  }

  public isLoggedIn(): boolean {
    const bearerToken: string | null = localStorage.getItem("bearerToken")
    return bearerToken != null && bearerToken.length != 0
  }
}
