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
import { ModalComponent } from '../modal.component';

@Directive({
  selector: '[modal]',
})
export class ModalDirective {
  @Input() modal: TemplateRef<any>;
  private componentRef: ComponentRef<ModalComponent> | null;

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
        this.componentFactoryResolver.resolveComponentFactory(ModalComponent);
      this.componentRef = componentFactoryResolver.create(this.injector);
      this.appRef.attachView(this.componentRef.hostView);
      const domElem = (this.componentRef.hostView as EmbeddedViewRef<any>)
        .rootNodes[0];
      document.body.appendChild(domElem);
      this.setModalComponentProperties();
    }
  }

  setModalComponentProperties() {
    if (this.componentRef !== null && this.componentRef.instance !== null) {
      this.componentRef.instance.content = this.modal;
    }
  }

  @HostListener('document:click', ['$event'])
  clickout(e: Event) {
    if (!this.componentRef) return;
    if (
      this.componentRef.location.nativeElement.contains(e.target)
      // &&
      // this.elementRef.nativeElement.contains(e.target)
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
