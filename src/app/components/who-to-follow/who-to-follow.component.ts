import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.css'],
})
export class WhoToFollowComponent implements OnInit {
  allUsers$: Observable<any[]>;

  constructor(private usersService: UserService) {}

  ngOnInit(): void {
    this.allUsers$ = this.usersService.getAllUsers();
  }
}
