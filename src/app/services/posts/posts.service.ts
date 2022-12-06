import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';

export interface IPost {
  date: string;
  username: string;
  text: string;
  first_name: string;
  last_name: string;
  user_id: string;
  user_photo_url: string;
}

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getAllPosts(): Observable<any[]> {
    return this.http.get<IPost[]>('http://localhost:8080/api/posts').pipe(
      map((res) => {
        console.log(res);
        return res;
      })
    );
  }

  createNewPost(text: string) {
    console.log('hi');
    console.log(text);
    return this.http
      .post('http://localhost:8080/api/posts', {
        text,
        author: '1',
        date: new Date().toISOString(),
      })
      .subscribe((res) => {
        console.log(res);
      });
  }
}
