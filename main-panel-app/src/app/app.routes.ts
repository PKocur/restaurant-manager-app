import {Routes} from '@angular/router';

import {AppComponent} from './component/app/app.component'
import {InformationComponent} from './component/information/information.component'
import {MealsComponent} from "./component/meals/meals.component";
import {LoginComponent} from "./component/login/login.component";
import {AuthorizationGuard} from "./component/common/authorization-guard.service";
import {LogoutComponent} from "./component/logout/logout.component";
import {HomeComponent} from "./component/home/home.component";

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'meals', component: MealsComponent, canActivate: [AuthorizationGuard]},
  {path: 'information', component: InformationComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
