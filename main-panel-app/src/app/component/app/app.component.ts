import {Component} from '@angular/core';
import {RouterModule} from "@angular/router";
import {AuthorizationService} from "../../service/authorization.service";
import {audit} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public authorizationService: AuthorizationService) {
  }

  logOut() {
    this.authorizationService.logOut()
  }

  isLoggedIn(): boolean {
    return this.authorizationService.isLoggedIn();
  }
}
