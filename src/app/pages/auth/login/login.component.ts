import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { ToastService } from '../../../shared/toast.service';
import { NgIf } from '@angular/common';


@Component({
  imports: [RouterLink, ReactiveFormsModule, NgIf],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  constructor(
    private apiService: ApiService,
    private router: Router,
    private toastService: ToastService
  ) { }

  formData = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  handleGoogle() {
    window.location.href = 'http://localhost:7001/api/v1/auth/google';
  }

  get email() {
    return this.formData.get('email');
  }
  get password() {
    return this.formData.get('password');
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
        password: this.formData.value.password
      }

      this.apiService.loginUser(payload).subscribe({
        next: (res: any) => {
          console.log(res, " : Login response")
          localStorage.setItem('daily_drift_token', res.data.token);
          localStorage.setItem('daily_drift_user', JSON.stringify({ ...res.data.user }));
          this.toastService.showToast('Login successfully', "success");
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error('Login failed:', err.error.message);
          this.toastService.showToast(err.error.message || 'Failed to login. Please try again later.', "error");
        }
      });
    }
  }
}
