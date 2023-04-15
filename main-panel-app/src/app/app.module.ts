import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './component/app/app.component';

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {InformationComponent} from './component/information/information.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {MealsComponent} from './component/meals/meals.component';
import { LoginComponent } from './component/login/login.component';
import { LogoutComponent } from './component/logout/logout.component';
import { HomeComponent } from './component/home/home.component';
import { RegistrationComponent } from './component/registration/registration.component';
import { AnalyticsComponent } from './component/analytics/analytics.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    MealsComponent,
    LoginComponent,
    LogoutComponent,
    HomeComponent,
    RegistrationComponent,
    AnalyticsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
