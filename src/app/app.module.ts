import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {PagedesignComponent} from './LabWork4Test/Login/pagedesign.component';
import {AuthorizationFormComponent} from './LabWork4Test/Login/authorizationForm.component';
import {MaindesignComponent} from './LabWork4Test/MainPage/maindesign.component';
import {AreaComponent} from './LabWork4Test/MainPage/Area/area.component';
import {ApiService} from './api.service';
import {SessionService} from './session.service';
import {AuthService} from './auth.service';
import {HttpClientModule} from '@angular/common/http';
import {MainPageGuard} from './main-page.guard';

@NgModule({
  declarations: [
    PagedesignComponent,
    AuthorizationFormComponent,
    MaindesignComponent,
    AreaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    ApiService,
    SessionService,
    AuthService,
    MainPageGuard
  ],
  bootstrap: [PagedesignComponent]
})
export class AppModule {
}
