import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Output,
  ViewContainerRef,
} from '@angular/core';
import { NewPostComponent } from '../components/new-post/new-post.component';
import { MenuComponent } from '../components/shared/menu/menu.component';

@Directive({
  selector: '[clickOutside]',
})
export class ClickOutsideDirective {
  constructor(private elementRef: ElementRef, private vc: ViewContainerRef) {}

  @Output() clickOutside = new EventEmitter<MouseEvent>();

  @HostListener('document:click', ['$event', '$event.target'])
  public onClick(event: MouseEvent, targetElement: HTMLElement): void {
    if (!targetElement) {
      return;
    }
    const clickedInside = this.elementRef.nativeElement.contains(targetElement);
    if (!clickedInside) {
      this.clickOutside.emit(event);
    } else {
      console.log('clicked inside?');
      console.log(this.vc);
      // const newComp = this.vc.createComponent(NewPostComponent);
      // this.vc.createEmbeddedView(this.elementRef.nativeElement);
    }
  }
}
