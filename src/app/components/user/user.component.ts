import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, of } from 'rxjs';
import { IUser, UserService } from 'src/app/services/user/user.service';
import { PostsService } from '../../services/posts/posts.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  user$: Observable<any>;
  posts$: Observable<any[]>;

  constructor(
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {}

  ngOnInit(): void {
    this.user$ = this.activatedRoute.params.pipe(
      map((params) => {
        const username = params['username'];
        return {
          username,
          posts: this.postsService.getPostsByUsername(username),
        };
      })
    );
  }
}
