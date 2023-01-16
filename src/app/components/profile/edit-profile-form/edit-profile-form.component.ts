import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { map, Observable, startWith, tap } from 'rxjs';
import { IUser } from '../../../services/user/user.service';

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
})
export class EditProfileFormComponent implements OnInit {
  @Input() user: IUser;
  editProfileForm: FormGroup;
  @Output() formData = new EventEmitter<{
    name: string;
    description: string;
  }>();

  descriptionLength = new Observable<number>();
  nameLength = new Observable<number>();

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.editProfileForm = this.fb.group({
      name: new FormControl(this.user.name, {
        validators: [Validators.maxLength(50)],
      }),
      description: new FormControl(this.user.description, {
        validators: [Validators.maxLength(160)],
      }),
    });

    this.nameLength = this.editProfileForm.valueChanges.pipe(
      map((form) => form.name.length),
      startWith(this.user.name.length)
    );

    this.descriptionLength = this.editProfileForm.valueChanges.pipe(
      map((form) => form.description.length),
      startWith(this.user.description?.length ?? 0)
    );

    this.editProfileForm.valueChanges.subscribe((formData) => {
      this.formData.emit(formData);
    });
  }
}
