import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PagedesignComponent} from './LabWork4Test/Login/pagedesign.component';
import {MaindesignComponent} from './LabWork4Test/MainPage/maindesign.component';
import {MainPageGuard} from './main-page.guard';

const routes: Routes = [
  {path: '', component: PagedesignComponent},
  {
    path: 'MainPage', component: MaindesignComponent,
    canActivate: [MainPageGuard]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
