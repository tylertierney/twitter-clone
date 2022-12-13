import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  HostListener,
  Injector,
  Input,
  TemplateRef,
} from '@angular/core';
import { MenuComponent } from '../menu.component';

@Directive({
  selector: '[menu]',
})
export class MenuDirective {
  @Input() menu: TemplateRef<any>;
  private componentRef: ComponentRef<MenuComponent> | null;

  constructor(
    private elementRef: ElementRef,
    private appRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector
  ) {}

  @HostListener('click')
  onClick(): void {
    // console.log('clicked inside');
    if (!this.componentRef) {
      const componentFactoryResolver =
        this.componentFactoryResolver.resolveComponentFactory(MenuComponent);
      this.componentRef = componentFactoryResolver.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0];
      document.body.appendChild(domElem);
      this.setMenuComponentProperties();
    }
  }

  setMenuComponentProperties() {
    if (this.componentRef !== null && this.componentRef.instance !== null) {
      this.componentRef.instance.content = this.menu;
      const { left, right, bottom, top, height } =
        this.elementRef.nativeElement.getBoundingClientRect();
      console.log(height);
      console.log(top);
      // this.componentRef.instance.left = (right - left) / 2 + left;
      this.componentRef.instance.left = parseInt(right, 10) + 16;
      this.componentRef.instance.top = top - Math.floor(height / 4);
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(e: Event) {
    if (!this.componentRef) return;
    if (
      !this.componentRef.location.nativeElement.contains(e.target) &&
      !this.elementRef.nativeElement.contains(e.target)
    ) {
      this.destroy();
    }
  }

  destroy() {
    if (!this.componentRef) return;
    this.appRef.detachView(this.componentRef.hostView);
    this.componentRef.destroy();
    this.componentRef = null;
  }
}
