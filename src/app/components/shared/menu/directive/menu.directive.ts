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
import { NavigationStart, Router } from '@angular/router';
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
    private injector: Injector,
    private router: Router
  ) {
    this.router.events.subscribe((e) => {
      if (e instanceof NavigationStart) {
        this.destroy();
      }
    });
  }

  @HostListener('click')
  onClick(): void {
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
      const { right, top, height, left } =
        this.elementRef.nativeElement.getBoundingClientRect();
      // this.componentRef.instance.left = parseInt(right, 10) + 16;
      // this.componentRef.instance.top = top - Math.floor(height / 4);

      if (window.innerWidth <= 460) {
        this.componentRef.instance.left = 0;
        this.componentRef.instance.top = 0;
        this.componentRef.instance.height = '100vh';
        this.componentRef.instance.width = '100%';
        // this.componentRef.instance.
      } else {
        this.componentRef.instance.left = parseInt(right, 10) + 16;
        this.componentRef.instance.top = top - Math.floor(height / 4);
      }

      // this.componentRef.instance.left = parseInt(left, 10);
      // this.componentRef.instance.top = parseInt(top, 10) - height;
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
