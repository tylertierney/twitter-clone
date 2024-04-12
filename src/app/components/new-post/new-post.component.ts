import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { filter, map, shareReplay, startWith } from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { CircularProgressComponent } from '../shared/circular-progress/circular-progress.component';
import { RouterModule } from '@angular/router';
import { TagsComponent } from './tags/tags.component';
import { RxPush } from '@rx-angular/template/push';

const TWEET_MAX_LENGTH = 280;

interface TweetForm {
  text: FormControl<string>;
  photo_file: FormControl<File | undefined>;
  replying_to: FormControl<string | undefined>;
  tags: FormControl<string[]>;
}

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
})
export class NewPostComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;
  domain = environment.domain;
  @Input() helperText: TemplateRef<HTMLSpanElement>;
  @Input() label: 'Reply' | 'Tweet' = 'Tweet';
  @Input() placeholder = "What's happening?";
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Input() replying_to?: string;

  tweetForm = new FormGroup<TweetForm>({
    text: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(TWEET_MAX_LENGTH)],
      updateOn: 'change',
      nonNullable: true,
    }),
    photo_file: new FormControl(undefined, {
      nonNullable: true,
    }),
    replying_to: new FormControl(this.replying_to, {
      nonNullable: true,
    }),
    tags: new FormControl([], {
      nonNullable: true,
    }),
  });

  tweetLength$ = this.tweetForm.controls.text.valueChanges.pipe(
    map((text) => text.length),
    startWith(0),
    shareReplay(1)
  );

  circularProgressValue$ = this.tweetLength$.pipe(
    filter((length) => length > 0),
    map((length) => (length / TWEET_MAX_LENGTH) * 100)
  );

  safePhotoUrl$ = this.tweetForm.controls.photo_file.valueChanges.pipe(
    map((file) => {
      if (!file) return '';
      const url = URL.createObjectURL(file);
      return this.sanitizer.bypassSecurityTrustUrl(url);
    })
  );

  showTags = false;

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.tweetForm.valueChanges.subscribe((_) => {
      this.textarea.nativeElement.style.height = 'auto';
      this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
    });

    this.tweetForm.patchValue(
      { replying_to: this.replying_to },
      { emitEvent: false }
    );
  }

  resizeTextArea(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  setPhoto(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      this.tweetForm.patchValue({ photo_file: file });
    }
  }

  tags: string[] = [];

  addTag(tag: string) {
    const oldTags = this.tweetForm.controls['tags'].value;
    this.tweetForm.patchValue({ tags: [...oldTags, tag] });
  }

  removeTag(i: number) {
    const oldTags = this.tweetForm.controls['tags'].value;
    oldTags.splice(i, 1);
    this.tweetForm.patchValue({ tags: oldTags });
  }
}
