import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from '../../shared/toast.service';


@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  blogList: any = [];
  isLoading = true;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const name = params['name']
      const avatar = params['avatar']
      console.log({ name, avatar }, "user data", token)
      if (token) {
        localStorage.setItem('daily_drift_token', token);
        localStorage.setItem('daily_drift_user', JSON.stringify({ name, avatar }));
        this.router.navigate([], { queryParams: {} });
      }
    });

    this.apiService.getBlogList().subscribe({
      next: (data: any) => {
        console.log(data, ": blog data")
        this.blogList = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showToast('Failed to load blogs. Please try again later.', "error");
        this.isLoading = false;
      }
    });


  }
}
