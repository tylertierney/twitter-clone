import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth/auth.service';
import { ThemeService } from '../../services/theme/theme.service';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.css'],
})
export class WhoToFollowComponent implements OnInit {
  allUsers$: Observable<any[]>;
  showingMore = false;

  constructor(
    public usersService: UserService,
    public authService: AuthService,
    public themeService: ThemeService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    this.allUsers$ = this.usersService.getAllUsers();
  }
}
