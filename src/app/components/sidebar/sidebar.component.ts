import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  scrollPosition = 0;

  constructor(private host: ElementRef<HTMLElement>) {}

  ngOnInit(): void {
    this.scrollPosition = window.scrollY;
  }

  @HostListener('document:scroll', ['$event', '$event.target'])
  public onClick(e: MouseEvent, targetElement: HTMLElement): void {
    const offset = window.scrollY;
    if (offset > this.scrollPosition) {
      // console.log('scrolling down');
      // this.host.nativeElement.style.marginTop = 'auto';
      // this.host.nativeElement.style.bottom = '0';
      // this.host.nativeElement.style.top = 'unset';
      // this.host.nativeElement.style.marginBottom = 'unset';

      this.host.nativeElement.style.top = '-290px';
      this.host.nativeElement.style.removeProperty('bottom');
    } else {
      // this.host.nativeElement.style.marginTop = 'unset';
      // this.host.nativeElement.style.bottom = 'unset';
      // this.host.nativeElement.style.marginBottom = 'auto';
      // this.host.nativeElement.style.top = -420 + 'px';

      // console.log('scrolling up');

      this.host.nativeElement.style.bottom = '-280px';
      this.host.nativeElement.style.removeProperty('top');
    }
    this.scrollPosition = offset;
  }
}
