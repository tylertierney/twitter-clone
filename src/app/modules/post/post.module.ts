import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostComponent } from '../../components/post/post.component';
import { SharedModule } from '../shared/shared.module';
import { PostHeaderComponent } from '../../components/post/post-header/post-header.component';
import { PostBodyComponent } from '../../components/post/post-body/post-body.component';
import { PostToolbarComponent } from '../../components/post/post-toolbar/post-toolbar.component';
import { PostButtonComponent } from '../../components/post/post-button/post-button.component';
import { TagsComponent } from '../../components/new-post/tags/tags.component';
import { NewPostComponent } from '../../components/new-post/new-post.component';
import { ReplyComponent } from '../../components/reply/reply.component';

@NgModule({
  declarations: [
    NewPostComponent,
    PostComponent,
    PostHeaderComponent,
    PostBodyComponent,
    PostToolbarComponent,
    PostButtonComponent,
    TagsComponent,
    ReplyComponent,
  ],
  imports: [CommonModule, SharedModule],
  exports: [PostComponent, NewPostComponent],
})
export class PostModule {}
