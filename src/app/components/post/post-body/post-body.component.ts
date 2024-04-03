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
  @Input() showToolbar = true;
  @Input() showMedia = true;

  domain = environment.domain;

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {}

  openDialog() {
    this.dialog.open(NewPostComponent);
  }

  onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/header-pics/gray-header-pic.svg';
  }
}
