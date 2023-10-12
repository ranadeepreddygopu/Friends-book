import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    public route: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      formData.role= ''
      this.authService.login().subscribe(
        (response:any) => {

          // Handle successful login response, e.g., redirect to dashboard
          const user = response.find((user:IUserDetails)=>{
            return user.username === this.loginForm.value.username && user.password === this.loginForm.value.password 
          });
          if(user){
            alert('Login Succesful');
            this.loginForm.reset()
            localStorage.setItem('currentUser',JSON.stringify(user));
            if(user.role ==='admin'){
             
              this.route.navigate(["/dashboard/admin"])
            }else{
              this.route.navigate(["/dashboard/user"])
            }
           
          }else{
            alert("user not found")

          }
        },
        (error:any) => {
          // Handle login error, e.g., display an error message
        }
      );
    }
  }
}
