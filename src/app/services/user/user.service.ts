import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, tap } from 'rxjs';

export interface IUser {
  id: string;
  username: string;
  email: string;
  name: string;
  profile_pic: string;
  header_pic: string;
  created_at: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUserById(id: string): Observable<any> {
    return this.http.get<IUser>(`/users/${id}`);
  }

  getUserByUsername(username: string): Observable<IUser> {
    return this.http.get<IUser>(`/users/${username}`);
  }

  getAllUsers(): Observable<any[]> {
    return this.http.get<IUser[]>(`/users/`);
  }

  getFollowingUser(
    currentUserId: string,
    targetUserId: string
  ): Observable<boolean> {
    return this.http
      .get<{ following: boolean }>(`/follow/${currentUserId}/${targetUserId}`)
      .pipe(map((res) => res.following));
  }

  followUser(
    currentUserId: string,
    targetUserId: string,
    currentlyFollowing: boolean
  ) {
    return this.http.post(`/follow/${currentUserId}/${targetUserId}`, {
      action: currentlyFollowing ? 'unfollow' : 'follow',
    });
  }

  deleteProfile(currentUserId: string) {
    return this.http.delete(`/users/${currentUserId}`);
  }

  getFollowersListForAUser(username: string) {
    return this.http.get<IUser[]>(`/users/${username}/followers`);
  }

  getFollowingListForAUser(username: string) {
    return this.http.get<IUser[]>(`/users/${username}/following`);
  }
}
