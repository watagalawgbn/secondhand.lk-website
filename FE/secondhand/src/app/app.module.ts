import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { RouterModule } from '@angular/router'; // Add this import
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ModeratordashboardComponent } from './moderatordashboard/moderatordashboard.component';
import { AdreviewsComponent } from './adreviews/adreviews.component';
import { UserreportingsComponent } from './userreportings/userreportings.component';
import { RequestsComponent } from './requests/requests.component';
import { HeaderComponent } from './header/header.component';
import { TabMenuModule } from 'primeng/tabmenu';
import { BadgeModule } from 'primeng/badge';
import { StatisticComponent } from './statistic/statistic.component';
//import { SignupComponent } from './signup/signup.component';
// import { AdacceptchartComponent } from './adacceptchart/adacceptchart.component';
// import { StatisticComponent } from './statistic/statistic.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ModeratordashboardComponent,
    AdreviewsComponent,
    UserreportingsComponent,
    RequestsComponent,
    HeaderComponent,
    StatisticComponent,
    // SignupComponent,
    // AdacceptchartComponent,
    // StatisticComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule, // Add this line
    TabMenuModule,
    BadgeModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
