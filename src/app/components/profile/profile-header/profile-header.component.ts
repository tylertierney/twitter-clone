import { Dialog } from '@angular/cdk/dialog';
import { CommonModule } from '@angular/common';
import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatMenuModule } from '@angular/material/menu';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { RxPush } from '@rx-angular/template/push';
import { ToastrService } from 'ngx-toastr';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { ModalService } from '../../../services/modal/modal.service';
import { EditProfileService } from '../../../services/profile/edit-profile.service';
import { IUser, UserService } from '../../../services/user/user.service';
import { MenuComponent, MenuItem } from '../../menu/menu.component';
import { FollowButtonComponent } from '../../shared/follow-button/follow-button.component';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';
import {
  EditProfileFormComponent,
  NameAndDescription,
} from '../edit-profile-form/edit-profile-form.component';
import { ReplaySubject, Subject, switchMap, withLatestFrom } from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FollowButtonComponent,
    EditProfileFormComponent,
    MatMenuModule,
    MenuComponent,
    SubmitButtonComponent,
    RxPush,
  ],
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() isEditable = false;
  @Input() user: IUser;

  newHeaderPicUrl: SafeUrl;
  newHeaderPicFile: File;

  newProfilePicUrl: SafeUrl;
  newProfilePicFile: File;
  domain = environment.domain;

  constructor(
    private sanitizer: DomSanitizer,
    public editProfileService: EditProfileService,
    public authService: AuthService,
    public dialog: Dialog,
    public modalService: ModalService,
    private toast: ToastrService,
    private userService: UserService
  ) {}

  getPhotoPreview = (e: Event): { file: File; previewUrl: SafeUrl } => {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      const url = URL.createObjectURL(file);
      return { file, previewUrl: this.sanitizer.bypassSecurityTrustUrl(url) };
    }
    return { file: new File([], ''), previewUrl: '' };
  };

  setNewHeaderPicUrl(e: Event) {
    const { file, previewUrl } = this.getPhotoPreview(e);
    this.newHeaderPicFile = file;
    this.newHeaderPicUrl = previewUrl;
  }

  setNewProfilePicUrl(e: Event) {
    const { file, previewUrl } = this.getPhotoPreview(e);
    this.newProfilePicFile = file;
    this.newProfilePicUrl = previewUrl;
  }

  confirmUpdatedHeaderPic(username: string, newHeaderPicFile: File) {
    this.editProfileService
      .updateHeaderPic(username, newHeaderPicFile)
      .subscribe((user) => {
        this.newHeaderPicUrl = '';
        this.user = user;
        this.authService.userSubject.next(user);
        this.toast.success('Header pic updated!');
      });
  }

  confirmUpdatedProfilePic(username: string, newProfilePicFile: File) {
    this.editProfileService
      .updateProfilePic(username, newProfilePicFile)
      .subscribe((user) => {
        this.newProfilePicUrl = '';
        this.user = user;
        this.authService.userSubject.next(user);
        this.toast.success('Profile pic updated!');
      });
  }

  openEditProfileModal(template: TemplateRef<EditProfileFormComponent>) {
    this.modalService.open({
      title: 'Edit Profile',
      content: template,
      showSubmitButton: true,
      onSubmit: () => this.editProfileSubmitClick.next(),
      submitButtonLabel: 'Save',
    });
  }

  editProfileFormSubject = new ReplaySubject<NameAndDescription>(1);
  editProfileSubmitClick = new Subject<void>();

  ngOnInit(): void {
    this.editProfileSubmitClick
      .pipe(
        withLatestFrom(this.editProfileFormSubject, (_, form) => form),
        switchMap((nameAndDescription) =>
          this.editProfileService.updateNameAndDescription(
            this.user.username,
            nameAndDescription
          )
        )
      )
      .subscribe((updatedUser) => {
        this.toast.success('Your profile was updated!');
        this.authService.userSubject.next(updatedUser);
        this.user = updatedUser;
        this.modalService.close();
      });
  }

  onHeaderPicError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/header-pics/gray-header-pic.svg';
  }

  onProfilePicError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }

  destroyRef = inject(DestroyRef);

  profileOptionsMenuItems: MenuItem[] = [
    {
      label: 'Delete Profile',
      onClick: () => this.deleteProfileClick(),
      icon: 'delete',
    },
  ];

  @ViewChild('deleteProfileModal')
  deleteProfileModal: TemplateRef<HTMLDivElement>;

  deleteProfileClick() {
    this.modalService.open({
      title: 'Delete Profile',
      content: this.deleteProfileModal,
      showSubmitButton: false,
    });
  }

  deleteProfileConfirm() {
    this.userService
      .deleteProfile(this.user.id)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.modalService.close();
        this.authService.logout();
      });
  }
}
