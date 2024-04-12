import {
  Component,
  DestroyRef,
  inject,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EditProfileService } from '../../../services/profile/edit-profile.service';
import { IUser, UserService } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalService } from '../../../services/modal/modal.service';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FollowButtonComponent } from '../../shared/follow-button/follow-button.component';
import { MatMenuModule } from '@angular/material/menu';
import { MenuComponent, MenuItem } from '../../menu/menu.component';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';
import { RxPush } from '@rx-angular/template/push';

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

  editProfileFormData: { name: string; description: string } = {
    name: '',
    description: '',
  };

  constructor(
    private sanitizer: DomSanitizer,
    public editProfileService: EditProfileService,
    public authService: AuthService,
    public dialog: Dialog,
    public modalService: ModalService,
    private toast: ToastrService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.editProfileFormData = {
      name: this.user.name,
      description: this.user.description,
    };
  }

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
      onSubmit: () => {
        this.editProfileService
          .updateNameAndDescription(
            this.user.username,
            this.editProfileFormData
          )
          .subscribe((updatedUser) => {
            this.modalService.close();
            this.toast.success('Your profile was updated!');
            this.authService.userSubject.next(updatedUser);
          });
      },
      submitButtonLabel: 'Save',
    });
  }

  getFormData(formData: { name: string; description: string }) {
    this.editProfileFormData.name = formData.name;
    this.editProfileFormData.description = formData.description;
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
