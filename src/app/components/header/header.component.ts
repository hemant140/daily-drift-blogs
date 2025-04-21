import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../shared/toast.service';

@Component({
  selector: 'app-header',
  imports: [RouterLink, NgIf],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,
    private toastService: ToastService
  ) { }


  showDropdown = false;

  isLoggedIn = false;
  user: any = null;
  defaultAvatar = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIf4R5qPKHPNMyAqV-FjS_OTBB8pfUV29Phg&s';

  ngOnInit(): void {
    setTimeout(() => {
      const token = localStorage.getItem('daily_drift_token');
      const userData = localStorage.getItem('daily_drift_user');
      // console.log(" :token Data ", userData, " :userData")
      if (token && userData) {
        this.isLoggedIn = true;
        this.user = JSON.parse(userData);
      }
    }, 300)


  }

  logout(): void {
    localStorage.removeItem('daily_drift_token');
    localStorage.removeItem('daily_drift_user');
    this.isLoggedIn = false;
    this.user = null;
    this.toastService.showToast('Logout successful', "success");
    this.router.navigate(['/']);
  }

}
