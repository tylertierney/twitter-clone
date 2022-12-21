import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, Subject } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { IPost, PostsService } from '../../../services/posts/posts.service';
import { IUser } from '../../../services/user/user.service';
import {
  CdkOverlayOrigin,
  Overlay,
  OverlayRef,
  PositionStrategy,
} from '@angular/cdk/overlay';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.css'],
})
export class PostBodyComponent implements OnInit {
  @Input() currentUser: IUser;
  @Input() expanded: boolean;
  @Input() post: IPost;
  isLiked: boolean;

  numOfLikes: number;

  domain = environment.domain;

  // private overlayRef: OverlayRef;
  isOpen = false;

  // positionStrategy: PositionStrategy = {
  //   attach() {}
  // };

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private http: HttpClient,
    private overlay: Overlay
  ) {}

  ngOnInit(): void {
    // this.overlayRef = this.overlay.create({
    //   hasBackdrop: true,
    //   scrollStrategy: this.overlay.scrollStrategies.noop(),
    // });

    this.postsService
      .getPostIsLiked(this.post.id, this.currentUser.id)
      .subscribe((isLiked) => (this.isLiked = isLiked));

    this.http
      .get<number>(`/posts/${this.post.id}/likes`)
      .subscribe((x) => (this.numOfLikes = x));
  }

  togglePostLiked(post_id: string, user_id: string) {
    this.postsService.togglePostLiked(post_id, user_id).subscribe((isLiked) => {
      this.isLiked = isLiked;
      isLiked ? (this.numOfLikes += 1) : (this.numOfLikes -= 1);
    });
  }

  test() {
    // const overlayRef = overlay.create();
  }
}
