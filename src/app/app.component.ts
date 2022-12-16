import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme/theme.service';
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-routing';

  text: string = '';

  constructor(
    private http: HttpClient,
    private themeService: ThemeService,
    public authService: AuthService,
    private usersService: UserService
  ) {}

  ngOnInit(): void {}
}
