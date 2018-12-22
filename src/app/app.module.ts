import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { PagedesignComponent } from './LabWork4Test/Login/pagedesign.component';
import { AuthorizationFormComponent} from './LabWork4Test/Login/authorizationForm.component';
import { MaindesignComponent} from './LabWork4Test/MainPage/maindesign.component';
import { AreaComponent} from './LabWork4Test/MainPage/Area/area.component';

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
  ],
  providers: [],
  bootstrap: [PagedesignComponent]
})
export class AppModule { }
