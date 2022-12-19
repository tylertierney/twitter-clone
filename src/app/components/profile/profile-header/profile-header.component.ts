import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { EditProfileService } from '../../../services/profile/edit-profile.service';
import { IUser } from '../../../services/user/user.service';

@Component({
  selector: 'app-profile-header',
  templateUrl: './profile-header.component.html',
  styleUrls: ['./profile-header.component.css'],
})
export class ProfileHeaderComponent implements OnInit {
  @Input() user: IUser;
  newHeaderPicUrl: SafeUrl;
  newHeaderPicFile: File;

  newProfilePicUrl: SafeUrl;
  newProfilePicFile: File;

  constructor(
    private http: HttpClient,
    private sanitizer: DomSanitizer,
    public editProfileService: EditProfileService
  ) {}

  ngOnInit(): void {}

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
