import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EditProfileService } from '../../../services/profile/edit-profile.service';
import { IUser } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { Dialog } from '@angular/cdk/dialog';
import { ModalService } from '../../../services/modal/modal.service';
import { EditProfileFormComponent } from '../edit-profile-form/edit-profile-form.component';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  ReplaySubject,
  Subject,
  tap,
} from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { FollowButtonComponent } from '../../shared/follow-button/follow-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, FollowButtonComponent, EditProfileFormComponent],
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() isEditable = false;
  // currentUser: IUser;
  @Input() user: IUser;
  newHeaderPicUrl: SafeUrl;
  newHeaderPicFile: File;

  newProfilePicUrl: SafeUrl;
  newProfilePicFile: File;
  domain = environment.domain;
  // isEditable = false;

  editProfileFormData: { name: string; description: string } = {
    name: '',
    description: '',
  };

  constructor(
    private sanitizer: DomSanitizer,
    public editProfileService: EditProfileService,
    public authService: AuthService,
    public dialog: Dialog,
    private modalService: ModalService,
    private toast: ToastrService
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
        this.authService.user$.next(user);
        this.toast.success('Header pic updated!');
      });
  }

  confirmUpdatedProfilePic(username: string, newProfilePicFile: File) {
    this.editProfileService
      .updateProfilePic(username, newProfilePicFile)
      .subscribe((user) => {
        this.newProfilePicUrl = '';
        this.user = user;
        this.authService.user$.next(user);
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
            this.authService.user$.next(updatedUser);
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
}
