import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './components/user/registration/registration.component';
import { LoginComponent } from './components/user/login/login.component';


const routes: Routes = [
  { path: '', redirectTo: '/register', pathMatch: 'full' }, // Redirect to login by default
  { path: 'register', component: RegistrationComponent },
  { path: 'login', component: LoginComponent },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
