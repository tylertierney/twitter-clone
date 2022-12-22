import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit, TemplateRef } from '@angular/core';
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
import { Dialog, DIALOG_DATA } from '@angular/cdk/dialog';
import { NewPostComponent } from '../../new-post/new-post.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.css'],
})
export class PostBodyComponent implements OnInit {
  @Input() currentUser: IUser;
  @Input() post: IPost;
  @Input() type: 'reply' | 'feed' | 'expanded';

  isLiked: boolean;

  numOfLikes: number;

  domain = environment.domain;

  // private overlayRef: OverlayRef;
  // isOpen = false;

  // positionStrategy: PositionStrategy = {
  //   attach() {}
  // };

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private http: HttpClient,
    private overlay: Overlay,
    public dialog: MatDialog,
    public modalService: ModalService
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

  openDialog() {
    this.dialog.open(NewPostComponent);
  }

  togglePostLiked(post_id: string, user_id: string) {
    this.postsService.togglePostLiked(post_id, user_id).subscribe((isLiked) => {
      this.isLiked = isLiked;
      isLiked ? (this.numOfLikes += 1) : (this.numOfLikes -= 1);
    });
  }

  test(template: TemplateRef<any>) {
    console.log('test called');
    this.modalService.content$.next(template);
    this.modalService.isOpen$.next(true);
  }
}

// @Component({
//   selector: 'dialog-animations-example-dialog',
//   templateUrl: './test.component.html',
// })
// export class DialogAnimationsExampleDialog {
//   constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
// }
