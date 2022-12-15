import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import {
  forkJoin,
  map,
  merge,
  mergeMap,
  Observable,
  of,
  share,
  switchMap,
  tap,
  zip,
} from 'rxjs';
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

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    public themeService: ThemeService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    // this.profile$ = this.activatedRoute.params.pipe(
    //   mergeMap((params) => {
    //     const username = params['username'];
    //     return forkJoin({
    //       user$: this.userService.getUserByUsername(username),
    //       posts$: this.postsService.getPostsByUsername(username),
    //     });
    //   })
    // );

    const username$ = this.activatedRoute.params.pipe(
      tap(console.log),
      map((params) => params['username'])
      // share()
    );

    this.user$ = username$.pipe(
      switchMap((username) => this.userService.getUserByUsername(username))
    );

    this.posts$ = username$.pipe(
      switchMap((username) => this.postsService.getPostsByUsername(username))
    );

    zip(this.user$, this.posts$).subscribe((res) => console.log('zip = ', res));
    this.profile$ = zip(this.user$, this.posts$);

    // username$.subscribe((res) => console.log(res));
  }

  test(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      this.newHeaderPicUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }
}