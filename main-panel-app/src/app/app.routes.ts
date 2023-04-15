import {Routes} from '@angular/router';

import {AppComponent} from './component/app/app.component'
import {InformationComponent} from './component/information/information.component'
import {MealsComponent} from "./component/meals/meals.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthorizationGuard} from "./common/authorization-guard.service";
import {LogoutComponent} from "./component/logout/logout.component";
import {HomeComponent} from "./component/home/home.component";
import {RegistrationComponent} from "./component/registration/registration.component";
import {AnalyticsComponent} from "./component/analytics/analytics.component";

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegistrationComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'meals', component: MealsComponent, canActivate: [AuthorizationGuard]},
  {path: 'information', component: InformationComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
