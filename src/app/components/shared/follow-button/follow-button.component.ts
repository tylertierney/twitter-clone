import { Component, Input, OnInit } from '@angular/core';
import { PostsService } from '../../../services/posts/posts.service';
import { IUser, UserService } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
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
        this.isFollowing = following;
      });
  }

  followUser(e: MouseEvent): void {
    e.stopPropagation();
    this.userService
      .followUser(this.currentUser.id, this.targetUser.id, this.isFollowing)
      .subscribe(() => {
        this.isFollowing = !this.isFollowing;
        this.postsService.fetchFollowedPostsSubject.next();
        this.postsService.fetchAllPostsSubject.next();
      });
  }
}
