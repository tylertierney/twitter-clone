import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { environment } from '../../../../environments/environment';
import { AuthService } from '../../../services/auth/auth.service';
import { ThemeService } from '../../../services/theme/theme.service';
import { IUser } from '../../../services/user/user.service';

@Component({
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
    console.log('clicked');
  }
}
