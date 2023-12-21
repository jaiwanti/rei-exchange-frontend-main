import { Component, HostListener, ViewChild } from '@angular/core';
import { MatDrawerMode, MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent {
  dynamicMode!: MatDrawerMode;
  isDrawerOpen = true;
  userName: any = 'Welcome';
  isNewSignup: boolean = true;

  @ViewChild('drawer') public drawer!: MatSidenav;

  constructor(private router: Router,
    private userService: UserService,) { }

  ngOnInit() {
    this.setDrawerConfigs();
    this.welcomeUser();
    this.getUserDetails();
  }

  welcomeUser() {
    if (localStorage.getItem('user')) {
      let userDetails = JSON.parse(localStorage.getItem('user') || '{}');
      if (userDetails) {
        this.isNewSignup = false;
        this.userName = "Hello, " + userDetails.userName;
      }
    }
  }

  getUserDetails() {
    this.userService.getUserDetails.subscribe((res: any) => {
      if (res) {
        this.welcomeUser();
      }
    });
  }
  @HostListener('window:resize', ['$event'])
  onresize() {
    this.setDrawerConfigs();
  }

  /**
   * @name setDrawerConfig
   * @desc Sets drawer configuration as per
   * meta detected
   * @return {void}
   */
  setDrawerConfigs(): void {
    if (window.innerWidth <= 992) {
      this.dynamicMode = 'over';
      this.isDrawerOpen = false;
    } else {
      this.isDrawerOpen = true;
      this.dynamicMode = 'side';
    }
  }

  logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('auth-token');
    localStorage.removeItem('role');

    this.router.navigate(['/']);
  }
}
