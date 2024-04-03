import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  filter,
  map,
  Observable,
  of,
  ReplaySubject,
  share,
  shareReplay,
  startWith,
  tap,
} from 'rxjs';
import { IUser } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';

type NameAndDescription = Pick<IUser, 'name' | 'description'>;

interface IUserForm {
  name: FormControl<string>;
  description: FormControl<string>;
}

@Component({
  selector: 'app-edit-profile-form',
  templateUrl: './edit-profile-form.component.html',
  styleUrls: ['./edit-profile-form.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditProfileFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  userSubject = new ReplaySubject<IUser>(1);
  @Input() set user(user: IUser) {
    this.userSubject.next(user);
  }

  nameAndDescription$: Observable<NameAndDescription> = this.userSubject.pipe(
    map((user) => ({ name: user.name, description: user.description }))
  );

  // @Output() formData = new EventEmitter<NameAndDescription>();

  @Output() valueChangesSubject = new ReplaySubject<NameAndDescription>(1);

  editProfileForm = this.fb.group<IUserForm>({
    name: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(50)],
    }),
    description: new FormControl('', {
      nonNullable: true,
      validators: [Validators.maxLength(160)],
    }),
  });

  nameLength$ = this.valueChangesSubject.pipe(
    map((form) => form.name ?? ''),
    map((name) => name.length)
  );

  descriptionLength$ = this.valueChangesSubject.pipe(
    map((form) => form.description ?? ''),
    map((description) => description.length)
  );

  ngOnInit() {
    this.editProfileForm.valueChanges
      .pipe(map(() => this.editProfileForm.getRawValue() as NameAndDescription))
      .subscribe(this.valueChangesSubject);

    this.nameAndDescription$.subscribe((nameAndDescription) => {
      this.editProfileForm.patchValue(nameAndDescription);
    });

    // this.valueChangesSubject
    //   .pipe(
    //     map(
    //       ({ name, description }) =>
    //         ({
    //           name: name ?? '',
    //           description: description ?? '',
    //         } as NameAndDescription)
    //     )
    //   )
    //   .subscribe((formData) => {
    //     this.formData.emit(formData);
    //   });
  }
}
