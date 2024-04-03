import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  domain = environment.domain;

  constructor(
    public themeService: ThemeService,
    public authService: AuthService
  ) {}

  ngOnInit(): void {}

  getUser() {
    this.authService.user$.subscribe(console.log);
  }

  onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }
}
