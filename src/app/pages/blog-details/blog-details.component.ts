import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-blog-details',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './blog-details.component.html',
  styleUrl: './blog-details.component.scss'
})
export class BlogDetailsComponent {
  blog: any;
  isLoading = true;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  ngOnInit(): void {
    const blogPostId = this.route.snapshot.paramMap.get('id');

    this.apiService.getBlogById(blogPostId).subscribe({
      next: (data: any) => {
        console.log(data.data, "Detail BlogPost Data")
        this.blog = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showToast('Failed to load blogs. Please try again later.', "error");
        this.isLoading = false;
      }
    });
  }

}
