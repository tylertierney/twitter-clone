import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth/auth.service';
import { ModalService } from '../../../services/modal/modal.service';
import { IPost, PostsService } from '../../../services/posts/posts.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReadableDatePipe } from '../../../pipes/readable-date.pipe';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';
import { RxPush } from '@rx-angular/template/push';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReadableDatePipe,
    SubmitButtonComponent,
    RxPush,
  ],
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css'],
})
export class PostHeaderComponent implements OnInit {
  @Input() post: IPost;
  @Output() postDeleted = new EventEmitter<void>();

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
    this.postsService.deletePostById(id).subscribe(() => {
      this.toast.success('Tweet deleted');
      this.modalService.close();
      this.postsService.fetchFollowedPostsSubject.next();
      this.postDeleted.emit();
    });
  }
}
