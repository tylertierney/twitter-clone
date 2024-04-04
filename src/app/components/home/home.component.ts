import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../services/modal/modal.service';
import { UserService } from '../../services/user/user.service';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../navbar/navbar.component';
import { Router, RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ModalComponent } from '../shared/modal/modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    NavbarComponent,
    RouterModule,
    SidebarComponent,
    ModalComponent,
  ],
})
export class HomeComponent implements OnInit {
  @ViewChild('spacer') spacer: ElementRef<HTMLDivElement>;

  constructor(
    private userService: UserService,
    public modalService: ModalService
  ) {}

  @HostListener('window:keyup.escape', ['$event'])
  handleKeyDown() {
    this.modalService.close();
  }

  ngOnInit(): void {}

  getUsers() {
    this.userService.getAllUsers().subscribe(console.log);
  }

  scrollPosition = window.scrollY;

  // @HostListener('document:scroll', ['$event', '$event.target'])
  // public onScroll() {
  //   const offset = window.scrollY;
  //   if (offset > this.scrollPosition) {
  //     // console.log('scrolling down');
  //     // this.host.nativeElement.style.marginTop = 'auto';
  //     // this.host.nativeElement.style.bottom = '0';
  //     // this.host.nativeElement.style.top = 'unset';
  //     // this.host.nativeElement.style.marginBottom = 'unset';
  //     // this.spacer.nativeElement.style.marginTop = offset + 'px';
  //   } else {
  //     const sidebarHeight = parseInt(
  //       window.getComputedStyle(this.sidebar.nativeElement).height,
  //       10
  //     );
  //     console.log(sidebarHeight);

  //     // this.spacer.nativeElement.style.marginTop =
  //     //   (offset - sidebarHeight > 0 ? offset + sidebarHeight : 0) + 'px';
  //     this.spacer.nativeElement.style.marginTop = offset + 'px';
  //     console.log('scrolling up');
  //   }
  //   this.scrollPosition = offset;
  // }
}
