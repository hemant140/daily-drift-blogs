import { NgFor, NgIf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ApiService } from '../../service/api.service';
import { ToastService } from '../../shared/toast.service';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, NgIf, NgFor, FormsModule],
  templateUrl: './blog-post.component.html',
  styleUrl: './blog-post.component.scss'
})
export class BlogPostComponent {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private apiService: ApiService,
    private toastService: ToastService
  ) { }

  userblogsList: any = [];
  isLoading = true;
  isUploading = false
  blogPostId: string = "";

  selectedBlog: any = null;
  showModal: boolean = false;
  form: any = {
    title: '',
    description: '',
    tag: '',
    topics: '',
    image: ''
  };

  formErrors = {
    title: false,
    description: false,
    tag: false,
    topics: false,
    image: false
  };

  ngOnInit() {
    const token = localStorage.getItem('daily_drift_token');
    if (!token) {
      this.router.navigate(['/']);
      return;
    }
    this.getBlogData()

  }

  getBlogData() {
    this.apiService.getUserBlogs().subscribe({
      next: (data: any) => {
        console.log(data, "User Blog Post Data")
        this.userblogsList = data.data;
        this.isLoading = false;
      },
      error: (err) => {
        this.toastService.showToast('Failed to get user blogs. Please try again later.', "error");
        this.isLoading = false;
      }
    });
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'blog_image_upload');

    this.isUploading = true;
    fetch('https://api.cloudinary.com/v1_1/dyac08ors/image/upload', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        this.isUploading = false;
        console.log(data.secure_url, ": Image URL")
        this.form.image = data.secure_url;
      })
      .catch(err => {
        this.toastService.showToast('Image upload failed.', 'error');
        this.isUploading = false;
      });
  }

  addBlog() {
    this.selectedBlog = null;
    this.formErrors = {
      title: false,
      description: false,
      tag: false,
      topics: false,
      image: false
    };
    this.form = { title: '', description: '', tag: '', topics: '', image: '' };
    this.showModal = true;
  }

  editBlog(blog: any) {
    this.selectedBlog = blog;
    this.blogPostId = blog.blogPostId
    this.form = {
      title: blog.title,
      description: blog.description,
      tag: blog.tag,
      topics: blog.topics.join(','),
      image: blog.image
    };
    this.formErrors = {
      title: false,
      description: false,
      tag: false,
      topics: false,
      image: false
    };
    this.showModal = true;
  }

  handleSubmit() {
    this.formErrors = {
      title: !this.form.title.trim(),
      description: !this.form.description.trim(),
      tag: !this.form.tag.trim(),
      topics: !this.form.topics.trim(),
      image: !this.form.image.trim()
    };

    const hasErrors = Object.values(this.formErrors).some(error => error);

    if (hasErrors) {
      return;
    }

    const payload = {
      ...this.form,
      topics: this.form.topics.split(',').map((topic: string) => topic.trim())
    };

    console.log(payload, ": Payload")

    if (this.selectedBlog) {
      this.apiService.updateBlog(this.blogPostId, payload).subscribe({
        next: (data: any) => {
          this.toastService.showToast('Blog updated successfully ', "success");
          this.getBlogData()
        },
        error: (err) => {
          console.error("Error occur in update blog", err)
          this.toastService.showToast('Failed to update blog. Please try again later.', "error");
        }
      });
    } else {
      this.apiService.createBlog(payload).subscribe({
        next: (data: any) => {
          this.toastService.showToast('Blog created successfully ', "success");
          this.getBlogData()
        },
        error: (err) => {
          console.error("Error occur in create blog", err)
          this.toastService.showToast('Failed to create blog. Please try again later.', "error");
        }
      });
    }

    this.closeModal();
  }

  deleteBlog(blogPostId: string) {
    this.apiService.deleteBlog(blogPostId).subscribe({
      next: (data: any) => {
        this.toastService.showToast('Blog deleted successfully ', "success");
        this.getBlogData()
      },
      error: (err) => {
        console.error("Error occur in delete blog", err)
        this.toastService.showToast('Failed to delete blog. Please try again later.', "error");
      }
    });
  }


  closeModal() {
    this.showModal = false;
  }

}
