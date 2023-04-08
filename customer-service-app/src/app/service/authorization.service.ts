import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {LoginForm} from "../model/loginForm";
import {Constants} from "../common/Constants";
import {AuthorizationUtil} from "../common/AuthorizationUtil";

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor(private httpClient: HttpClient) {
  }

  public logIn(loginForm: LoginForm): Observable<any> {
    const headers = {
      observe: 'response'
    }
    const requestOptions = {
      headers: new HttpHeaders(headers),
      observe: 'response' as 'body'
    };
    return this.httpClient.post(Constants.AUTHORIZATION_API_ENDPOINT + "users/login", loginForm, requestOptions);
  }

  public handleSuccessfulLogin(body: any): void {
    localStorage.setItem("bearerToken", body.jwtToken)
  }

  public validateAccess(token: string): boolean {
    return AuthorizationUtil.validateUserRoleForApp(token, Constants.ROLE_WAITER)
  }

  public logOut() {
    localStorage.removeItem("bearerToken")
  }

  public isLoggedIn(): boolean {
    const bearerToken: string | null = AuthorizationUtil.getBearerToken()
    return bearerToken != null && bearerToken.length != 0
  }
}
