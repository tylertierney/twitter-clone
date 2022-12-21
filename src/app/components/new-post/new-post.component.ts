import {
  Component,
  ElementRef,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, tap } from 'rxjs';
import { PostsService } from 'src/app/services/posts/posts.service';
import { environment } from '../../../environments/environment';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
})
export class NewPostComponent implements OnInit {
  @ViewChild('textarea') textarea: ElementRef;
  domain = environment.domain;
  @Input() helperText: TemplateRef<HTMLParagraphElement>;

  tweetForm = this.fb.group({
    text: new UntypedFormControl('', {
      validators: [Validators.required, Validators.maxLength(280)],
      updateOn: 'change',
    }),
  });

  tweetLength$ = this.tweetForm.valueChanges.pipe(
    map((form) => {
      return form.text.length;
    })
  );

  constructor(
    public postsService: PostsService,
    public authService: AuthService,
    private fb: UntypedFormBuilder
  ) {}

  ngOnInit(): void {
    this.tweetForm.valueChanges.subscribe((_) => {
      this.textarea.nativeElement.style.height = 'auto';
      this.textarea.nativeElement.style.height = `${this.textarea.nativeElement.scrollHeight}px`;
    });

    this.tweetLength$.subscribe(console.log);
  }

  resizeTextArea(textarea: HTMLTextAreaElement) {
    textarea.style.height = textarea.scrollHeight + 'px';
  }
}
