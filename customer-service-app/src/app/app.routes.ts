import {Routes} from '@angular/router';

import {AppComponent} from './component/app/app.component'
import {HomeComponent} from "./component/home/home.component";
import {LoginComponent} from "./component/login/login.component";
import {LogoutComponent} from "./component/logout/logout.component";
import {AuthorizationGuard} from "./common/authorization-guard.service";
import {MealComponent} from "./component/meal/meal.component";
import {OrderComponent} from "./component/order/order.component";

export const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {path: 'logout', component: LogoutComponent},
  {path: 'orders', component: OrderComponent, canActivate: [AuthorizationGuard]},
  {path: 'meals', component: MealComponent, canActivate: [AuthorizationGuard]},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
