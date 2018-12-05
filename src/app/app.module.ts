import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PagedesignComponent } from './LabWork4Test/Login/pagedesign.component';

@NgModule({
  declarations: [
    PagedesignComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [PagedesignComponent]
})
export class AppModule { }
