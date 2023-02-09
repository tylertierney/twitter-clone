import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { UserService } from 'src/app/services/user/user.service';
import { PostsService } from '../../services/posts/posts.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent {
  newHeaderPicUrl: SafeUrl;
  newHeaderPicFile: File;

  username$ = this.activatedRoute.params.pipe(
    map((params) => params['username'])
  );
  user$ = this.username$.pipe(
    switchMap((username) => this.userService.getUserByUsername(username))
  );
  posts$ = this.username$.pipe(
    switchMap((username) => this.postsService.getPostsByUsername(username))
  );
  numOfFollowing$ = this.user$.pipe(
    switchMap(({ id }) => this.http.get<number>('/users/' + id + '/following/'))
  );
  numOfFollowers$ = this.user$.pipe(
    switchMap(({ id }) => this.http.get<number>('/users/' + id + '/followers/'))
  );

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    public themeService: ThemeService,
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    public location: Location
  ) {}
}
