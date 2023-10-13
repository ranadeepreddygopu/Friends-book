import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IUserDetails } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { AdminService } from 'src/app/services/admin.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
  public loginForm: FormGroup;
  public switch:boolean
  public isdisable:boolean
  public loginForm1: FormGroup;
  userID:string
  ID:number
  username:string;
  email:string;

  constructor(
    private fb: FormBuilder,
    private fb1: FormBuilder,
    private authService: AuthService,
    private adminServive:AdminService,
    public route: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.email],
    });
    this.loginForm1 = this.fb1.group({
      password: ['', Validators.minLength(6)],
    });
    this.switch=false
    this.isdisable=true
    this.userID=''
    this.ID=0
    this.username=""
    this.email=""
  }

  public onSubmit() {
    if (this.loginForm.valid) {
      const formData = this.loginForm.value;
      formData.role= ''
      this.authService.forgetpassword().subscribe(
        (response:any) => {

          // Handle successful login response, e.g., redirect to dashboard
          const user = response.find((user:IUserDetails)=>{
            return user.username === this.loginForm.value.username && user.email === this.loginForm.value.email 
          });
          if(user){
            this.switch=true
            this.userID=user.username
            this.username=user.username
            this.email=user.email
            this.ID=user.id
            this.loginForm.reset()
            localStorage.setItem('currentUser',JSON.stringify(user));
           
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

  public onpasswordchange(){
    this.adminServive.updatepassword( this.loginForm1.getRawValue(),this.ID).subscribe((val:IUserDetails)=>{
    alert('Password Updated Successful')

    this.route.navigate(["/login"])

  })
}
}
