import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { ToastService } from '../../../shared/toast.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) { }

  formData = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  get name() {
    return this.formData.get('name');
  }
  get email() {
    return this.formData.get('email');
  }
  get password() {
    return this.formData.get('password');
  }


  handleGoogle() {
    window.location.href = 'http://localhost:7001/api/v1/auth/google';
  }


  handleSubmit() {
    if (this.formData.invalid) {
      this.formData.markAllAsTouched();
      return;
    }

    console.log("Form data: ", this.formData.value)
    if (this.formData.valid) {
      const payload = {
        email: this.formData.value.email,
        password: this.formData.value.password,
        name: this.formData.value.name
      }

      this.apiService.signupUser(payload).subscribe({
        next: (res: any) => {
          console.log(res, " : signup response")
          this.toastService.showToast('Registration successfully completed', "success");
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.log('signup failed:', err.error.message);
          this.toastService.showToast(err.error.message || 'Failed to signup. Please try again later.', "error");
        }
      });
    }
  }

}
