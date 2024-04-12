import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormControlStatus,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { RxPush } from '@rx-angular/template/push';
import {
  catchError,
  filter,
  map,
  Observable,
  of,
  shareReplay,
  startWith,
  Subject,
  switchMap,
} from 'rxjs';
import { AuthService } from '../../../services/auth/auth.service';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';
import { UniqueEmailValidator } from '../validators/UniqueEmailValidator';
import { UniqueUsernameValidator } from '../validators/UniqueUsernameValidator';
import { usernameTextValidator } from '../validators/usernameTextValidator';

interface RegistrationForm {
  name: FormControl<string>;
  username: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
}

@Component({
  standalone: true,
  imports: [
    CommonModule,
    SubmitButtonComponent,
    ReactiveFormsModule,
    RouterModule,
    RxPush,
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {
  showPassword = false;

  constructor(
    private authService: AuthService,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private uniqueEmailValidator: UniqueEmailValidator,
    private router: Router
  ) {}

  registrationForm = new FormGroup<RegistrationForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(1),
      ],
    }),
    username: new FormControl<string>('', {
      nonNullable: true,
      asyncValidators: [
        this.uniqueUsernameValidator.validate.bind(
          this.uniqueUsernameValidator
        ),
      ],
      validators: [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(15),
        usernameTextValidator,
      ],
      updateOn: 'change',
    }),
    email: new FormControl('', {
      nonNullable: true,
      asyncValidators: [
        this.uniqueEmailValidator.validate.bind(this.uniqueEmailValidator),
      ],
      validators: [
        Validators.required,
        Validators.email,
        Validators.maxLength(255),
      ],
      updateOn: 'change',
    }),
    password: new FormControl('', {
      nonNullable: true,
      validators: [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(255),
      ],
      updateOn: 'change',
    }),
  });

  submitClickSubject = new Subject<void>();

  status$ = this.registrationForm.statusChanges.pipe(
    startWith(this.registrationForm.status)
  );

  disableSubmit$ = this.status$.pipe(map((status) => status !== 'VALID'));

  registrationResult$ = this.submitClickSubject.pipe(
    map(() => this.registrationForm.getRawValue()),
    map((form) => ({
      ...form,
      username: form.username.trim(),
      name: form.name.trim(),
      email: form.email.trim(),
    })),
    switchMap((value) =>
      this.authService.register(value).pipe(
        map((user) => ({ error: null, user })),
        catchError(({ message }) => of({ error: message, user: null }))
      )
    ),
    shareReplay(1)
  );

  errorResult$ = this.registrationResult$.pipe(
    map(({ error }) => error),
    filter(Boolean)
  );

  successfulResult$ = this.registrationResult$.pipe(
    map(({ user }) => user),
    filter(Boolean)
  );

  ngOnInit(): void {
    this.successfulResult$.subscribe((user) => {
      this.authService.userSubject.next(user);
      this.router.navigate(['']);
    });
  }

  nameErrors$: Observable<string[]> = this.status$.pipe(
    this.getFormControlErrors('name'),
    map((errorCodes) =>
      errorCodes.map((code) => {
        switch (code) {
          case 'required':
            return `What's your name?`;
          case 'minlength':
            return `Name must be 0-50 characters`;
          case 'maxlength':
            return `Name must be 0-50 characters`;
        }
        return '';
      })
    )
  );

  nameLength$: Observable<number> =
    this.registrationForm.controls.name.valueChanges.pipe(
      map((name) => name.length),
      startWith(0)
    );

  namePlaceholderShown$ = this.nameLength$.pipe(map((length) => length < 1));

  nameInvalid$: Observable<boolean> = this.status$.pipe(
    map(() => this.registrationForm.controls.name),
    filter((name) => name.dirty),
    map((name) => name.invalid)
  );

  usernameErrors$: Observable<string[]> = this.status$.pipe(
    this.getFormControlErrors('username'),
    map((errorCodes) =>
      errorCodes.map((code) => {
        switch (code) {
          case 'required':
            return `Choose a username`;
          case 'minlength':
            return `Username must be 4-15 characters`;
          case 'maxlength':
            return `Username must be 4-15 characters`;
          case 'alphanumericText':
            return `Username may only contain alphanumeric characters and underscores`;
          case 'usernameTaken':
            return `Username is already taken`;
        }
        return '';
      })
    )
  );

  usernameLength$: Observable<number> =
    this.registrationForm.controls.username.valueChanges.pipe(
      map((username) => username.length),
      startWith(0)
    );

  usernamePlaceholderShown$ = this.usernameLength$.pipe(
    map((length) => length < 1)
  );

  emailErrors$: Observable<string[]> = this.status$.pipe(
    this.getFormControlErrors('email'),
    map((errorCodes) =>
      errorCodes.map((code) => {
        switch (code) {
          case 'required':
            return `Enter a valid email address`;
          case 'email':
            return `Enter a valid email address`;
          case 'emailTaken':
            return `Email is already taken`;
        }
        return '';
      })
    )
  );

  emailLength$: Observable<number> =
    this.registrationForm.controls.email.valueChanges.pipe(
      map((email) => email.length),
      startWith(0)
    );

  emailPlaceholderShown$ = this.emailLength$.pipe(map((length) => length < 1));

  passwordErrors$: Observable<string[]> = this.status$.pipe(
    this.getFormControlErrors('password'),
    map((errorCodes) =>
      errorCodes.map((code) => {
        switch (code) {
          case 'required':
            return `A password is required`;
          case 'minlength':
            return `Password must be at least 8 characters`;
        }
        return '';
      })
    )
  );

  passwordLength$: Observable<number> =
    this.registrationForm.controls.password.valueChanges.pipe(
      map((password) => password.length),
      startWith(0)
    );

  passwordPlaceholderShown$ = this.passwordLength$.pipe(
    map((length) => length < 1)
  );

  getFormControlErrors(formControlName: keyof RegistrationForm) {
    return (source: Observable<FormControlStatus>) => {
      return source.pipe(
        map(() => this.registrationForm.get(formControlName)),
        filter(Boolean),
        filter((formControl) => formControl.dirty),
        map((formControl) => formControl.errors ?? []),
        map((errors) => Object.keys(errors))
      );
    };
  }
}
