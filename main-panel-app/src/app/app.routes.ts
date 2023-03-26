import {Routes} from '@angular/router';

import {AppComponent} from './component/app/app.component'
import {InformationComponent} from './component/information/information.component'
import {MealsComponent} from "./component/meals/meals.component";

export const appRoutes: Routes = [
  {path: 'meals', component: MealsComponent},
  {path: 'information', component: InformationComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
];
