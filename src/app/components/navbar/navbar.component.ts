import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    SettingsMenuComponent,
    UserMenuComponent,
  ],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  domain = environment.domain;

  constructor(
    public themeService: ThemeService,
    public authService: AuthService
  ) {}

  onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }
}
