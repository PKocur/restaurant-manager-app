import {Component} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {AuthorizationService} from "../../service/authorization.service";
import {LoginForm} from "../../model/loginForm";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loginFormFromView = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private authorizationService: AuthorizationService,
              private formBuilder: FormBuilder,
              public router: Router) {
  }

  onLoginFormSubmit() {
    this.logIn({
      "email": this.loginFormFromView.value.email,
      "password": this.loginFormFromView.value.password
    })
    this.loginFormFromView.reset();
  }

  logIn(loginForm: LoginForm) {
    this.authorizationService.logIn(loginForm).subscribe(
      result => {
        if (this.authorizationService.validateAccess(result.body.jwtToken)) {
          this.authorizationService.handleSuccessfulLogin(result.body)
          this.router.navigate([''])
        } else {
          window.alert("Insufficient privileges.");
        }
      },
      error => {
        if (error.status === 401) {
          window.alert("Invalid credentials.");
        } else {
          window.alert("Other error.");
        }
      });
  }
}
