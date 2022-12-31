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
import { BehaviorSubject, map, Observable, Subject, tap } from 'rxjs';
import {
  IPost,
  PostsService,
  ITweetForm,
} from '../../services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

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
  @Input() placeholder = "What's on your mind?";
  @Output() onSubmit = new EventEmitter<FormGroup>();
  @Output() getFormForReset = new EventEmitter<FormGroup>();

  // tweetForm = this.fb.group({
  //   text: new FormControl<string>('', {
  //     validators: [Validators.required, Validators.maxLength(280)],
  //     updateOn: 'change',
  //     nonNullable: true,
  //   }),
  //   photo_file: new FormControl<File | null>(null, {
  //     nonNullable: true,
  //   }),
  // });

  tweetForm = this.fb.group({
    text: new FormControl('', {
      validators: [Validators.required, Validators.maxLength(280)],
      updateOn: 'change',
      nonNullable: true,
    }),
    photo_file: new FormControl(null, {
      nonNullable: true,
    }),
    replying_to: new FormControl(null),
  });

  tweetLength$ = this.tweetForm.valueChanges.pipe(
    map((form) => {
      console.log(form);
      if (form && form.text && form.text.length) return form.text.length;
      return 0;
    })
  );

  safePhotoUrl$ = new BehaviorSubject<SafeUrl>('');

  toast = this.toastr;

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private fb: UntypedFormBuilder,
    public toastr: ToastrService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.tweetForm.valueChanges.subscribe((_) => {
      this.textarea.nativeElement.style.height = 'auto';
      this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
      console.log(_);
    });
  }

  resizeTextArea(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + 'px';
  }

  test() {
    this.toast.success('hello world', '', {
      closeButton: true,
      positionClass: 'toastPosition',
      toastClass: 'toastClass',
      easing: 'ease-in-out',
      tapToDismiss: true,
      newestOnTop: false,
    });
  }

  submit() {
    this.onSubmit.emit(this.tweetForm);
  }

  setPhoto(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      // this.newProfilePicFile = file;
      this.tweetForm.patchValue({ photo_file: file });
      const url = URL.createObjectURL(file);
      const safeUrl = this.sanitizer.bypassSecurityTrustUrl(url);
      this.safePhotoUrl$.next(safeUrl);
    }
  }

  cancelPhotoUpload() {
    this.tweetForm.patchValue({ photo_file: null });
    this.safePhotoUrl$.next('');
  }
}
