import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { ForgotPasswordComponent } from './components/user/forgot-password/forgot-password.component';


const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    children: [
      { path: 'admin', component: ManageUsersComponent },
      // { path: 'user', component: ProductsComponent }
    ],
  },
  {path:'forgotpassword',component:ForgotPasswordComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
