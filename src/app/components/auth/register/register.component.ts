import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';
import { UniqueEmailValidator } from '../validators/UniqueEmailValidator';
import { UniqueUsernameValidator } from '../validators/UniqueUsernameValidator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  showPassword = false;

  constructor(
    private fb: UntypedFormBuilder,
    private authService: AuthService,
    private uniqueUsernameValidator: UniqueUsernameValidator,
    private uniqueEmailValidator: UniqueEmailValidator
  ) {}

  registrationForm = this.fb.group({
    name: new UntypedFormControl('', {
      validators: [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(1),
      ],
    }),
    username: new UntypedFormControl('', {
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
    email: new UntypedFormControl('', {
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
    password: new UntypedFormControl('', {
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
      this.authService.register(this.registrationForm.value);
    }
  }
}
