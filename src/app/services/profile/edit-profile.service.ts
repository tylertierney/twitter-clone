import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { IUser } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private http: HttpClient) {}

  updateHeaderPic(username: string, headerPicFile: File) {
    const formdata = new FormData();
    formdata.append('header_pic', headerPicFile);
    return this.http.put<IUser>(`/users/${username}/header_pic`, formdata);
  }

  updateProfilePic(username: string, profilePicFile: File) {
    const formdata = new FormData();
    formdata.append('profile_pic', profilePicFile);
    return this.http.put<IUser>(`/users/${username}/profile_pic`, formdata);
  }
}
