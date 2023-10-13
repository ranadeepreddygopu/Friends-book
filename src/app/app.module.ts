import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { ResetPasswordComponent } from './components/user/reset-password/reset-password.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';


@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    ResetPasswordComponent,
    NavBarComponent,
    LoginComponent,
    DashboardComponent,
    ManageUsersComponent,
    ForgotPasswordComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
