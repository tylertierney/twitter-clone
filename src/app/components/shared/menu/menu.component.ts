import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  content: string;
  left = 0;
  top = 0;

  @ViewChild('menu') menu: ElementRef<HTMLMenuElement>;

  constructor() {}

  ngOnInit(): void {}

  // @HostListener('document:click')
  // public onClickOutside(e: Event) {
  //   console.log('hi');
  //   if (
  //     this.menu &&
  //     this.menu.nativeElement.contains(e.target as Node) === false
  //   ) {
  //     console.log('click outside?');
  //   }
  // }

  // clickListener(e: Event) {
  //   if (e.target && this.menu) {
  //     console.log(this.menu.nativeElement.contains(e.target as HTMLElement));
  //   }
  // }

  // onClickOutside(e: Event) {
  //   console.log('hi');
  //   if (
  //     this.open &&
  //     this.menu.nativeElement.contains(e.target as HTMLElement) === false
  //   ) {
  //     this.openChange.emit(false);
  //   }
  // }
}
