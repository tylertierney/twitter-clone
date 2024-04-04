import { Component, OnInit } from '@angular/core';
import { ThemeService } from 'src/app/services/theme/theme.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { SettingsMenuComponent } from './settings-menu/settings-menu.component';
import { MenuDirective } from '../shared/menu/directive/menu.directive';
import { MenuModule } from '../../modules/menu/menu.module';
import { UserMenuComponent } from './user-menu/user-menu.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatMenuModule,
    SettingsMenuComponent,
    MenuModule,
    UserMenuComponent,
  ],
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
