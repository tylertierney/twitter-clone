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
import { BehaviorSubject, Observable } from 'rxjs';
import { FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit, OnChanges {
  currentUser: IUser;
  @Input() user: IUser;
  newHeaderPicUrl: SafeUrl;
  newHeaderPicFile: File;

  newProfilePicUrl: SafeUrl;
  newProfilePicFile: File;
  domain = environment.domain;
  isEditable = false;

  editProfileFormData: { name: string; description: string };

  constructor(
    private sanitizer: DomSanitizer,
    public editProfileService: EditProfileService,
    private authService: AuthService,
    public dialog: Dialog,
    private modalService: ModalService,
    private toast: ToastrService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((currentUser) => {
      this.currentUser = currentUser;
      if (currentUser.id === this.user.id) {
        this.isEditable = true;
      }
    });

    this.editProfileFormData = {
      name: this.user.name,
      description: this.user.description,
    };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      this.currentUser &&
      changes['user'] &&
      changes['user'].currentValue &&
      changes['user'].currentValue.id
    ) {
      if (changes['user'].currentValue.id === this.currentUser.id) {
        this.isEditable = true;
      } else {
        this.isEditable = false;
      }
    }
  }

  setNewHeaderPicUrl(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      this.newHeaderPicFile = file;
      const url = URL.createObjectURL(file);
      this.newHeaderPicUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

  setNewProfilePicUrl(e: Event) {
    const files = (e.target as HTMLInputElement).files;
    if (files && files.length) {
      const file = files[0];
      this.newProfilePicFile = file;
      const url = URL.createObjectURL(file);
      this.newProfilePicUrl = this.sanitizer.bypassSecurityTrustUrl(url);
    }
  }

  confirmUpdatedHeaderPic(username: string, newHeaderPicFile: File) {
    this.editProfileService
      .updateHeaderPic(username, newHeaderPicFile)
      .subscribe((user) => {
        console.log(user);
        this.newHeaderPicUrl = '';
        this.user = user;
        this.authService.user$.next(user);
      });
  }

  confirmUpdatedProfilePic(username: string, newProfilePicFile: File) {
    this.editProfileService
      .updateProfilePic(username, newProfilePicFile)
      .subscribe((user) => {
        console.log(user);
        this.newProfilePicUrl = '';
        this.user = user;
        this.authService.user$.next(user);
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
}
