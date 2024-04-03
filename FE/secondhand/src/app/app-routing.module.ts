import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ModeratordashboardComponent } from './moderatordashboard/moderatordashboard.component';
import { LoginComponent } from './login/login.component';
import { RequestsComponent } from './requests/requests.component';
import { UserreportingsComponent } from './userreportings/userreportings.component';
import { AdreviewsComponent } from './adreviews/adreviews.component';
import { StatisticComponent } from './statistic/statistic.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'dashboard', component: ModeratordashboardComponent,
    children:[
      { path: 'adreview', component: AdreviewsComponent }, 
      { path: 'requests', component: RequestsComponent }, 
      { path: 'userreporting', component: UserreportingsComponent }, 
      {path: 'statistics', component: StatisticComponent}
    ]
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
