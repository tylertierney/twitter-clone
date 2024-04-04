import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
  UntypedFormBuilder,
  UntypedFormControl,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth/auth.service';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';

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
    private authService: AuthService
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

  ngOnInit(): void {}

  submit(): void {
    this.authService.login(this.loginForm.value);
  }
}
