import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { NgFor, NgIf } from '@angular/common';
import { ToastService } from '../../shared/toast.service';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-home',
  imports: [RouterLink, NgFor, NgIf, FormsModule],
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
  searchQuery: string = '';
  currentPage = 1;
  limit = 8;
  totalCount = 0;

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const token = params['token'];
      const name = params['name'];
      const avatar = params['avatar'];
      if (token) {
        localStorage.setItem('daily_drift_token', token);
        localStorage.setItem('daily_drift_user', JSON.stringify({ name, avatar }));
        this.router.navigate([], { queryParams: {} });
      }
    });

    this.fetchBlogs();
  }

  fetchBlogs(page: number = 1, search: string = '') {
    this.isLoading = true;
    this.apiService.getBlogList(page, this.limit, search).subscribe({
      next: (data: any) => {
        this.blogList = data.data.postData;
        this.totalCount = data.data.total;
        this.currentPage = page;
        this.isLoading = false;
      },
      error: () => {
        this.toastService.showToast('Failed to load blogs. Please try again later.', "error");
        this.isLoading = false;
      }
    });
  }

  onPageChange(page: number) {
    if (page !== this.currentPage) {
      this.fetchBlogs(page);
    }
  }

  get totalPages(): number {
    return Math.ceil(this.totalCount / this.limit);
  }


  onSearch() {
    this.fetchBlogs(1, this.searchQuery.trim());
  }

  clearSearch() {
    this.searchQuery = '';
    this.onSearch();
  }


}
