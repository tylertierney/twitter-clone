import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import { ToastrService } from 'ngx-toastr';
import {
  filter,
  map,
  scan,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { ModalService } from '../../services/modal/modal.service';
import { NewPost, PostsService } from '../../services/posts/posts.service';
import { CircularProgressComponent } from '../shared/circular-progress/circular-progress.component';
import { TagsComponent } from './tags/tags.component';

interface TweetForm {
  text: FormControl<string>;
  photo_file: FormControl<File | undefined>;
  replying_to: FormControl<string | undefined>;
  tags: FormControl<string[]>;
}

const generateTweetForm = () => {
  return new FormGroup<TweetForm>({
    text: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(TWEET_MAX_LENGTH)],
      updateOn: 'change',
      nonNullable: true,
    }),
    photo_file: new FormControl(undefined, {
      nonNullable: true,
    }),
    replying_to: new FormControl(undefined, {
      nonNullable: true,
    }),
    tags: new FormControl([], {
      nonNullable: true,
    }),
  });
};

const TWEET_MAX_LENGTH = 280;

@Component({
  standalone: true,
  imports: [
    CommonModule,
    CircularProgressComponent,
    RouterModule,
    ReactiveFormsModule,
    TagsComponent,
    RxPush,
  ],
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPostComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;
  domain = environment.domain;
  @Input() helperText: TemplateRef<HTMLSpanElement>;
  @Input() label: 'Reply' | 'Tweet' = 'Tweet';
  @Input() placeholder = "What's happening?";
  onSubmit = new Subject<void>();
  @Input() replying_to?: string;
  @Input() successToastMessage = 'Your tweet was posted';

  photoInputNameAttribute = `photoInput_${~~(Math.random() * 100000)}`;

  tweetForm = generateTweetForm();

  tweetLength$ = this.tweetForm.controls.text.valueChanges.pipe(
    map((text) => text.length),
    startWith(0),
    shareReplay(1)
  );

  circularProgressValue$ = this.tweetLength$.pipe(
    filter((length) => length > 0),
    map((length) => (length / TWEET_MAX_LENGTH) * 100)
  );

  photo_file$ = this.tweetForm.controls.photo_file.valueChanges;

  safePhotoUrl$ = this.photo_file$.pipe(
    shareReplay(1),
    map((file) => {
      if (!file) return '';
      const url = URL.createObjectURL(file);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    }),
    shareReplay(1)
  );

  showTagsToggle = new Subject<void>();

  showTags$ = this.showTagsToggle.pipe(
    scan((state, curr) => !state, false),
    startWith(false)
  );

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private sanitizer: DomSanitizer,
    private toast: ToastrService,
    private modalService: ModalService
  ) {}

  destroyRef = inject(DestroyRef);

  tags$ = this.tweetForm.valueChanges.pipe(
    map(({ tags }) => tags),
    filter(Boolean),
    shareReplay(1)
  );

  ngOnInit(): void {
    this.tweetForm.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.textarea.nativeElement.style.height = 'auto';
        this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
      });

    this.tweetForm.controls.replying_to.patchValue(this.replying_to, {
      emitEvent: false,
    });

    this.onSubmit
      .pipe(
        map(() => this.tweetForm.getRawValue() as NewPost),
        switchMap((post) => this.postsService.createNewPost(post)),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe(() => {
        this.toast.success(this.successToastMessage);
        this.postsService.fetchAllPostsSubject.next();
        this.postsService.fetchFollowedPostsSubject.next();
        this.tweetForm.reset();
        this.modalService.close();
      });
  }

  resizeTextArea(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  setPhoto(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      this.tweetForm.controls.photo_file.patchValue(file);
    }
  }

  addTag(tag: string) {
    const oldTags = this.tweetForm.controls.tags.value;
    this.tweetForm.controls.tags.patchValue([...oldTags, tag], {
      emitEvent: true,
    });
  }

  removeTag(idx: number) {
    const oldTags = this.tweetForm.controls.tags.value;
    const newTags = [...oldTags.slice(0, idx), ...oldTags.slice(idx + 1)];
    this.tweetForm.controls.tags.patchValue(newTags, { emitEvent: true });
  }
}
