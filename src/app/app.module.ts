import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { AuthGuard } from "./_guards/auth.guard";
import { ErrorInterceptor } from "./_interceptors/error.interceptor";
import { JwtInterceptor } from "./_interceptors/jwt.interceptor";
import { mockBackendProvider } from "./_mock/mock-backend";
import { AuthenticationService } from "./_services/authentication.service";
import { CalendarService } from './_services/calendar.service';
import { StateStore } from './_services/state-store.service';
import { UserService } from "./_services/user.service";
import { AppComponent } from './app.component';
import { CalendarEventPopupComponent } from './dashboard/calendar-event-popup/calendar-event-popup.component';
import { DashboardComponent } from "./dashboard/dashboard.component";
import { StarRatingComponent } from './dashboard/star-rating/star-rating.component';
import { LoginComponent } from "./login/login.component";
import { ClientsMainComponent } from "./main/clients/clients-main.component";
import { MainHeroComponent } from "./main/hero/main-hero.component";
import { MainComponent } from "./main/main.component";
import { NavbarComponent } from "./nav/navbar.component";
import { RegistrationComponent } from "./registration/registration.component";

const routes: Routes = [ // TODO: replace AppComponent with correct components
  { path: '', component: MainComponent/*, canActivate: [AuthGuard]*/ },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'clients', component: ClientsMainComponent, data: {title: 'Clients'} },
  { path: 'lawyers', component: AppComponent, data: {title: 'Lawyers'} },
  { path: 'dashboard', component: DashboardComponent, data: {title: 'Dashboard'}},

  // otherwise redirect to home
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    CalendarEventPopupComponent,
    ClientsMainComponent,
    DashboardComponent,
    LoginComponent,
    MainComponent,
    MainHeroComponent,
    NavbarComponent,
    RegistrationComponent,
    StarRatingComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    CalendarService,
    HttpClient,
    StateStore,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    mockBackendProvider
  ],
  bootstrap: [AppComponent]
}) export class AppModule {}
