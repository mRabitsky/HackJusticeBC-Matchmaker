import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NavbarComponent} from "./nav/navbar.component";
import {MainHeroComponent} from "./main/hero/main-hero.component";
import { RouterModule, Routes } from '@angular/router';
import {AlertComponent} from "./_directives/alert.component";
import {LoginComponent} from "./login/login.component";
import {RegistrationComponent} from "./registration/registration.component";
import {AuthGuard} from "./_guards/auth.guard";
import {AlertService} from "./_services/alert.service";
import {AuthenticationService} from "./_services/authentication.service";
import {UserService} from "./_services/user.service";
import {HTTP_INTERCEPTORS, HttpClient, HttpClientModule} from "@angular/common/http";
import {JwtInterceptor} from "./_interceptors/jwt.interceptor";
import {ErrorInterceptor} from "./_interceptors/error.interceptor";
import {mockBackendProvider} from "./_mock/mock-backend";
import {MainComponent} from "./main/main.component";
import {ReactiveFormsModule} from "@angular/forms";
import {ClientsMainComponent} from "./main/clients/clients-main.component";
import {CustomMaterializeModule} from "./materialize.module";
import {MzSelectModule} from "ngx-materialize";
import {DashboardComponent} from "./dashboard/dashboard.component";

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
    AlertComponent,
    AppComponent,
    MainHeroComponent,
    NavbarComponent,
    LoginComponent,
    RegistrationComponent,
    MainComponent,
    ClientsMainComponent,
    DashboardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CustomMaterializeModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
  ],
  providers: [
    AuthGuard,
    // AlertService,
    AuthenticationService,
    HttpClient,
    UserService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    mockBackendProvider
  ],
  bootstrap: [AppComponent]
}) export class AppModule {}
