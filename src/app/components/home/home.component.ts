import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ModalService } from '../../services/modal/modal.service';
import { NavbarComponent } from '../navbar/navbar.component';
import { ModalComponent } from '../shared/modal/modal.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { ToastrService } from 'ngx-toastr';

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
export class HomeComponent {
  @ViewChild('spacer') spacer: ElementRef<HTMLDivElement>;

  constructor(public modalService: ModalService) {}

  @HostListener('window:keyup.escape', ['$event'])
  handleKeyDown() {
    this.modalService.close();
  }

  scrollPosition = window.scrollY;

  @ViewChild('sidebar', { read: ElementRef }) sidebar!: ElementRef;

  @HostListener('window:scroll', ['$event', '$event.target'])
  onScroll() {
    const offset = window.scrollY - this.scrollPosition;
    this.sidebar.nativeElement?.scrollBy(0, offset);
    this.scrollPosition = window.scrollY;
  }
}
