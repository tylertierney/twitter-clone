import { HttpClient } from '@angular/common/http';
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EditProfileService } from '../../../services/profile/edit-profile.service';
import { IUser } from '../../../services/user/user.service';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';

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

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public editProfileService: EditProfileService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((currentUser) => {
      // if (currentUser.id === this.user.id) {
      //   console.log(currentUser.id);
      //   console.log(this.user.id);
      //   this.isEditable = true;
      // }
      this.currentUser = currentUser;
      if (currentUser.id === this.user.id) {
        this.isEditable = true;
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['user']);
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

  // confirmNewHeaderPic(username: string, profilePicFile: File) {
  //   const formdata = new FormData();
  //   formdata.append('header_pic', profilePicFile);
  //   // this.editProfileService.updateHeaderPic(username, newPicUrl);
  //   this.http
  //     .put(`/users/${username}/header_pic`, formdata, {
  //       // headers: {
  //       //   'Content-Type': 'multipart/form-data',
  //       // },
  //     })
  //     .subscribe(console.log);
  // }
}
