import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  public  registrationForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onRegisterSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.authService.register(formData).subscribe(
        () => {
          // Redirect to login page or another appropriate route after successful registration
          this.router.navigate(['/login']);
        },
        (error:any) => {
          // Handle registration error, e.g., display an error message
          console.error(error);
        }
      );
    }
  }

}
