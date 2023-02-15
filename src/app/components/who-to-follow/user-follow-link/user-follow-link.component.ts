import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { PostsService } from '../../../services/posts/posts.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { IUser, UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-follow-link',
  templateUrl: './user-follow-link.component.html',
  styleUrls: ['./user-follow-link.component.css'],
})
export class UserFollowLinkComponent implements OnInit {
  @Input() currentUser: any;
  @Input() targetUser: any;
  isFollowing: boolean;
  domain = environment.domain;

  constructor(
    private http: HttpClient,
    public themeService: ThemeService,
    private postsService: PostsService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.userService
      .getFollowingUser(this.currentUser.id, this.targetUser.id)
      .subscribe((following) => (this.isFollowing = following));
  }

  followUser(): void {
    this.userService
      .followUser(this.currentUser.id, this.targetUser.id, this.isFollowing)
      .subscribe(() => {
        this.isFollowing = !this.isFollowing;
        this.postsService.fetchFollowedPosts();
        this.postsService.fetchAllPosts();
      });
  }
}
