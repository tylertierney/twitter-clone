import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { IUser, UserService } from '../../../services/user/user.service';

@Component({
  selector: 'app-follow-button',
  templateUrl: './follow-button.component.html',
  styleUrls: ['./follow-button.component.css'],
})
export class FollowButtonComponent implements OnInit {
  @Input() currentUser: IUser;
  @Input() targetUser: IUser;
  isFollowing: boolean;

  constructor(
    public userService: UserService,
    public postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.userService
      .getFollowingUser(this.currentUser.id, this.targetUser.id)
      .subscribe((following) => {
        if (this.targetUser.id === '89') {
        }
        this.isFollowing = following;
      });
  }

  followUser(e: MouseEvent): void {
    e.stopPropagation();
    this.userService
      .followUser(this.currentUser.id, this.targetUser.id, this.isFollowing)
      .subscribe(() => {
        this.isFollowing = !this.isFollowing;
        this.postsService.fetchFollowedPosts();
        this.postsService.fetchAllPosts();
      });
  }
}
