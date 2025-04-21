import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl: string = "http://localhost:7001/api/v1";

  getBlogList(): Observable<any> {
    return this.http.get(`${this.baseUrl}/blog-post`);
  }

  loginUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signin`, payload);
  }

  signupUser(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/signup`, payload);
  }

  getUserBlogs(): Observable<any> {
    const token = localStorage.getItem('daily_drift_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };

    return this.http.get(`${this.baseUrl}/blog-post/user-posts`, { headers });
  }

  getBlogById(blogPostId: any): Observable<any> {
    return this.http.get(`${this.baseUrl}/blog-post/${blogPostId}`);
  }


  createBlog(payload: any): Observable<any> {
    const token = localStorage.getItem('daily_drift_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.post(`${this.baseUrl}/blog-post`, payload, { headers });
  }


  updateBlog(blogPostId: any, payload: any): Observable<any> {
    const token = localStorage.getItem('daily_drift_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.put(`${this.baseUrl}/blog-post/${blogPostId}`, payload, { headers });
  }

  deleteBlog(blogPostId: any): Observable<any> {
    const token = localStorage.getItem('daily_drift_token');
    const headers = {
      'Authorization': `Bearer ${token}`
    };
    return this.http.delete(`${this.baseUrl}/blog-post/${blogPostId}`, { headers });
  }

}
