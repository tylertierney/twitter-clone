import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { ModalService } from '../../../services/modal/modal.service';
import { IPost, PostsService } from '../../../services/posts/posts.service';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css'],
})
export class PostHeaderComponent implements OnInit {
  @Input() post: IPost;

  constructor(
    public authService: AuthService,
    public postsService: PostsService,
    public modalService: ModalService,
    public toast: ToastrService
  ) {}

  ngOnInit(): void {}

  stopPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  openModal(e: MouseEvent, template: TemplateRef<HTMLDivElement>) {
    e.stopPropagation();
    this.modalService.open({
      content: template,
    });
  }

  deletePostById(id: string) {
    this.postsService.deletePostById(id).subscribe((res) => {
      this.toast.success('Tweet deleted');
      this.modalService.close();
      this.postsService.fetchFollowedPosts();
    });
  }
}
