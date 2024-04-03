import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertisementComponent } from './advertisement/advertisement.component';
import { HomepageComponent } from './homepage/homepage.component';

const routes: Routes = [
  {path: '', component:HomepageComponent},
  {path: 'advertisement', component: AdvertisementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
