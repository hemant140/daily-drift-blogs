# Blog Post Frontend (Angular)
### A Modern Frontend for the Blog Platform Built with Angular 19
Blog Post Frontend is the Angular-based frontend for the NestJS microservices-powered blog platform. It allows users to browse blog posts publicly, sign up using email/password or Google, and create, update, or delete their own blogs with a clean and responsive interface.

## Features
- Publicly view all blog posts
- Signup/Login with email & password or Google
- View your own blog list
- Create, update, and delete your own blogs
- JWT-based authentication and route protection
- Responsive design

## Installation Steps
Requires Node.js v18+ and NPM.

1. Install Angular CLI
```bash
npm install -g @angular/cli
```
2. Clone the repository
```bash
git clone https://github.com/your-username/angular-blog-frontend
```
```bash
cd angular-blog-frontend
```
3. Install dependencies
```bash
npm install
```
4. Run the Angular App
```bash
ng serve
```
Then open your browser:

```bash
http://localhost:4200
```

## Routing Summary
#### Public Routes
- http://localhost:4200 - Home page showing all blog posts
- http://localhost:4200/login - Login with email/password
- http://localhost:4200/signup - Signup with email/password

#### Protected Routes
- http://localhost:4200/blog-post - View your own blogs only login user can access 
- Create a new blog
- Edit a blog
- http://localhost:4200/blog-post/:id - View single blog

## Notes
- Ensure that all backend services are up and running (API Gateway, Auth, Blog)

