import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { UserService } from '../../services/user/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  @ViewChild('spacer') spacer: ElementRef<HTMLDivElement>;

  constructor(
    private userService: UserService,
    private host: ElementRef<HTMLElement>
  ) {}

  ngOnInit(): void {}

  getUsers() {
    this.userService.getAllUsers().subscribe(console.log);
  }

  scrollPosition = window.scrollY;

  @HostListener('document:scroll', ['$event', '$event.target'])
  public onScroll() {
    const offset = window.scrollY;
    if (offset > this.scrollPosition) {
      // console.log('scrolling down');
      // this.host.nativeElement.style.marginTop = 'auto';
      // this.host.nativeElement.style.bottom = '0';
      // this.host.nativeElement.style.top = 'unset';
      // this.host.nativeElement.style.marginBottom = 'unset';
      // this.spacer.nativeElement.style.marginTop = offset + 'px';
    } else {
      this.spacer.nativeElement.style.marginTop = offset + 'px';

      console.log('scrolling up');
    }
    this.scrollPosition = offset;
  }
}
