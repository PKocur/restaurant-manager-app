import { Component } from '@angular/core';
import {AuthorizationService} from "../../service/authorization.service";
import {AuthorizationUtil} from "../../common/AuthorizationUtil";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(public authorizationService: AuthorizationService,
              public router: Router) {
  }

  isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }

  getFirstName(): string {
    return AuthorizationUtil.getDecodedBearerToken().firstName;
  }

  redirectToLogin() {
    this.router.navigate(['login'])
  }

  redirectToMeals() {
    this.router.navigate(['meals'])
  }

  redirectToOrders() {
    this.router.navigate(['orders'])
  }
}
