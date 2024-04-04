import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { IUser } from '../../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FollowButtonComponent } from '../follow-button/follow-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule, FollowButtonComponent],
  selector: 'app-user-search-result',
  templateUrl: './user-search-result.component.html',
  styleUrls: ['./user-search-result.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserSearchResultComponent {
  domain = environment.domain;

  @Input() user: IUser;
  @Input() showDescription = false;
  @Input() showFollowButton = false;

  constructor(public authService: AuthService) {}

  stopPropagation(e: MouseEvent) {
    e.stopPropagation();
  }

  onImageError(e: Event) {
    const target = e.target as HTMLImageElement;
    target.src = 'assets/svg/user-avatar/gray.svg';
  }
}
