import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap, tap } from 'rxjs';
import { IUser, UserService } from 'src/app/services/user/user.service';
import { PostsService } from '../../services/posts/posts.service';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile$: Observable<any>;
  user$: Observable<IUser>;
  posts$: Observable<any[]>;
  newHeaderPicUrl: SafeUrl;
  newHeaderPicFile: File;

  numOfFollowing$: Observable<number>;
  numOfFollowers$: Observable<number>;

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    public themeService: ThemeService,
    public sanitizer: DomSanitizer,
    private http: HttpClient,
    public location: Location
  ) {}

  ngOnInit(): void {
    const username$ = this.activatedRoute.params.pipe(
      map((params) => params['username'])
    );

    this.user$ = username$.pipe(
      switchMap((username) => this.userService.getUserByUsername(username))
    );

    this.posts$ = username$.pipe(
      switchMap((username) => this.postsService.getPostsByUsername(username))
    );

    this.numOfFollowing$ = this.user$.pipe(
      switchMap(({ id }) =>
        this.http.get<number>('/users/' + id + '/following/')
      )
    );

    this.numOfFollowers$ = this.user$.pipe(
      switchMap(({ id }) =>
        this.http.get<number>('/users/' + id + '/followers/')
      )
    );
  }
}
