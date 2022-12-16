import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class EditProfileService {
  constructor(private http: HttpClient) {}

  updateHeaderPic(username: string, header_pic: SafeUrl) {
    this.http
      .put(`/users/${username}/header_pic`, { header_pic })
      .subscribe(console.log);
  }
}
