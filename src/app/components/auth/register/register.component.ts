import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(private fb: FormBuilder, private authService: AuthService) {}

  myForm = this.fb.group({
    name: ['', Validators.required],
    username: [
      'tyler123',
      [Validators.required, Validators.minLength(4), Validators.maxLength(15)],
    ],
    email: ['tytierney@yahoo.com', [Validators.required]],
    password: ['hunter7', [Validators.required]],
  });

  ngOnInit(): void {
    // this.myForm.valueChanges.subscribe(console.log);
  }

  submit(): void {
    // this.authService.register(this.myForm.value);
    console.log(this.myForm);
  }
}
