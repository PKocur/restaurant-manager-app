import { Component } from '@angular/core';
import {AuthorizationService} from "../../service/authorization.service";
import {FormBuilder} from "@angular/forms";
import {Router} from "@angular/router";
import {RegistrationForm} from "../../model/registrationForm";

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {

  registrationFormFromView = this.formBuilder.group({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role: 'admin'
  });

  constructor(private authorizationService: AuthorizationService,
              private formBuilder: FormBuilder,
              public router: Router) {
  }

  onRegistrationFormSubmit() {
    this.register({
      "firstName": this.registrationFormFromView.value.firstName,
      "lastName": this.registrationFormFromView.value.lastName,
      "email": this.registrationFormFromView.value.email,
      "password": this.registrationFormFromView.value.password,
      "role": this.registrationFormFromView.value.role
    })
    this.registrationFormFromView.reset();
  }

  register(registrationForm: RegistrationForm) {
    this.authorizationService.register(registrationForm).subscribe(data => {
      if (data) {
        this.router.navigate(['login'])
      }
    });
  }
}
