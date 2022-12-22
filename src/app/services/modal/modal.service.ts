import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen$ = new BehaviorSubject<boolean>(false);
  content$ = new BehaviorSubject<TemplateRef<any> | null>(null);

  constructor() {
    this.isOpen$.subscribe((open) => {
      if (open) {
        document.body.style.overflow = 'hidden';
        document.body.style.paddingRight = '15px';
      } else {
        document.body.style.overflow = 'unset';
        document.body.style.paddingRight = '0px';
      }
    });
  }

  content(template: TemplateRef<any>) {
    console.log(template);
    this.content$.next(template);
  }
}
