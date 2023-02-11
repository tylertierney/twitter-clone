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
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { map, Observable } from 'rxjs';
import { PostsService } from '../../services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
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
  @Input() replying_to: string | null = null;

  tweetForm = this.fb.group({
    text: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(280)],
      updateOn: 'change',
      nonNullable: true,
    }),
    photo_file: new FormControl(null, {
      nonNullable: true,
    }),
    replying_to: new FormControl(this.replying_to, {
      nonNullable: true,
    }),
    tags: new FormControl([], {
      nonNullable: true,
    }),
  });

  tweetLength$ = this.tweetForm.valueChanges.pipe(
    map((form) => {
      if (form && form.text && form.text.length) return form.text.length;
      return 0;
    })
  );

  safePhotoUrl$ = this.tweetForm.valueChanges.pipe(
    map((form) => {
      const file = form.photo_file;
      if (file) {
        const url = URL.createObjectURL(form.photo_file);
        return this.sanitizer.bypassSecurityTrustUrl(url);
      }
      return '';
    })
  );

  showTags = false;

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private fb: UntypedFormBuilder,
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
