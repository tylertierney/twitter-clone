import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { IUser } from '../../../services/user/user.service';

@Component({
  selector: 'app-user-follow-link',
  templateUrl: './user-follow-link.component.html',
  styleUrls: ['./user-follow-link.component.css'],
})
export class UserFollowLinkComponent implements OnInit {
  @Input() currentUser: any;
  @Input() targetUser: any;
  isFollowing: boolean;

  constructor(
    private http: HttpClient,
    public themeService: ThemeService,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.http
      .get(`/follow/${this.currentUser.id}/${this.targetUser.id}`)
      .subscribe((res: any) => {
        this.isFollowing = res.following;
      });
  }

  followUser(): void {
    this.http
      .post(`/follow/${this.currentUser.id}/${this.targetUser.id}`, {
        action: this.isFollowing ? 'unfollow' : 'follow',
      })
      .subscribe({
        error: console.log,
        complete: () => (this.isFollowing = !this.isFollowing),
      });

    this.postsService.getFollowedPosts(this.currentUser.id);
  }
}
