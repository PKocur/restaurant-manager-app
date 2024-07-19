import {Component} from '@angular/core';
import {AuthorizationService} from "../../service/authorization.service";

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
