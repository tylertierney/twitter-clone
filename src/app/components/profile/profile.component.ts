import { HttpClient } from '@angular/common/http';
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
import { EditProfileService } from '../../services/profile/edit-profile.service';
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

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    public themeService: ThemeService,
    public sanitizer: DomSanitizer,
    private editProfileService: EditProfileService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const username$ = this.activatedRoute.params.pipe(
      tap(console.log),
      map((params) => params['username'])
    );

    this.user$ = username$.pipe(
      switchMap((username) => this.userService.getUserByUsername(username))
    );

    this.posts$ = username$.pipe(
      switchMap((username) => this.postsService.getPostsByUsername(username))
    );

    // zip(this.user$, this.posts$).subscribe((res) => console.log('zip = ', res));
    // this.profile$ = zip(this.user$, this.posts$);
  }

  setNewHeaderPicUrl(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      this.newHeaderPicFile = file;
      const url = URL.createObjectURL(file);
      this.newHeaderPicUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

  confirmNewHeaderPic(username: string, newPicUrl: SafeUrl) {
    const formdata = new FormData();
    formdata.append('header_pic', this.newHeaderPicFile);
    // this.editProfileService.updateHeaderPic(username, newPicUrl);
    this.http
      .put(`/users/${username}/header_pic`, formdata, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
      .subscribe(console.log);
  }
}
