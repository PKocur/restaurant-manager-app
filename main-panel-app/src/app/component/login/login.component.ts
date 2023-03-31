import {Component} from '@angular/core';
import {MainPanelService} from "../../service/main-panel.service";
import {FormBuilder} from "@angular/forms";
import {AuthorizationService} from "../../service/authorization.service";
import {Meal} from "../../model/meal";
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
    this.authorizationService.logIn(loginForm).subscribe(data => {
      if (data) {
        localStorage.setItem("bearerToken", data.body.jwtToken)
        this.router.navigate([''])
        // this.getMeals();
      }
    });
  }
}
