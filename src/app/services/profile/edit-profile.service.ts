import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private http: HttpClient) {}

  updateHeaderPic(username: string, headerPicFile: File) {
    const formdata = new FormData();
    formdata.append('header_pic', headerPicFile);
    this.http
      .put(`/users/${username}/header_pic`, formdata, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
      .subscribe(console.log);
  }

  updateProfilePic(username: string, profilePicFile: File) {
    const formdata = new FormData();
    formdata.append('profile_pic', profilePicFile);
    this.http
      .put(`/users/${username}/profile_pic`, formdata, {
        // headers: {
        //   'Content-Type': 'multipart/form-data',
        // },
      })
      .subscribe(console.log);
  }
}
