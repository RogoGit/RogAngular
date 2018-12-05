import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PagedesignComponent} from './LabWork4Test/Login/pagedesign.component';

const routes: Routes = [
  { path: '', component: PagedesignComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
