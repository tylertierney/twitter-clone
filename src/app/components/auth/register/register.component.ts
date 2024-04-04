import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';
import { UniqueEmailValidator } from '../validators/UniqueEmailValidator';
import { UniqueUsernameValidator } from '../validators/UniqueUsernameValidator';

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
  ],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent {
  showPassword = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private uniqueEmailValidator: UniqueEmailValidator
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

  submit(): void {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.getRawValue());
    }
  }
}
