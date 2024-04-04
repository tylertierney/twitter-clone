import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { IUser, UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { UserSearchResultComponent } from '../shared/user-search-result/user-search-result.component';

@Component({
  standalone: true,
  imports: [CommonModule, UserSearchResultComponent],
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.css'],
})
export class WhoToFollowComponent {
  allUsers$: Observable<IUser[]> = this.usersService.getAllUsers();
  // showingMore = false;

  constructor(
    public usersService: UserService,
    public authService: AuthService,
    public themeService: ThemeService,
    private http: HttpClient
  ) {}
}
