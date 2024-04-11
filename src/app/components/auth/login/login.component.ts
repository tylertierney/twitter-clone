import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../services/user/user.service';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';

interface LoginResult {
  error: boolean;
  user?: IUser;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SubmitButtonComponent,
    ReactiveFormsModule,
    RouterModule,
  ],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  showPassword = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  loginForm = this.fb.group({
    email: new UntypedFormControl('', {
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
      ],
      updateOn: 'change',
    }),
    password: new UntypedFormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ],
      updateOn: 'change',
    }),
  });

  ngOnInit(): void {
    this.loginResult$
      .pipe(
        map(({ user }) => user),
        filter(Boolean)
      )
      .subscribe((user) => {
        this.authService.user$.next(user);
        this.router.navigate(['home']);
      });
  }

  submitButtonClickSubject = new Subject<void>();

  submit(): void {
    this.authService.login(this.loginForm.value);
  }

  loginResult$: Observable<LoginResult> = this.submitButtonClickSubject.pipe(
    map(() => this.loginForm.getRawValue()),
    switchMap((value) =>
      this.authService.login(value).pipe(
        map((user) => ({ error: false, user })),
        catchError(() => of({ error: true }))
      )
    )
  );

  errorMessage$ = this.loginResult$.pipe(
    filter(({ error }) => error),
    map(() => 'Invalid username or password')
  );
}
