import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './component/app/app.component';

import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from "@angular/forms";
import {InformationComponent} from './component/information/information.component';
import {RouterModule} from '@angular/router';
import {appRoutes} from './app.routes';
import {MealsComponent} from './component/meals/meals.component';

@NgModule({
  declarations: [
    AppComponent,
    InformationComponent,
    MealsComponent
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
