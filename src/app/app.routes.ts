import { Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/login/login.component';
import { SignupComponent } from './pages/auth/signup/signup.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogPostComponent } from './pages/blog-post/blog-post.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { BlogDetailsComponent } from './pages/blog-details/blog-details.component';
import { AuthGuard } from './gaurd/auth.gaurd';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', component: LoginComponent, canActivate: [AuthGuard] },
    { path: 'signup', component: SignupComponent, canActivate: [AuthGuard] },
    { path: 'blog-post', component: BlogPostComponent, },
    { path: 'blog-post/:id', component: BlogDetailsComponent },
    { path: '**', component: PageNotFoundComponent },
];
