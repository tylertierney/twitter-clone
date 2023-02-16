import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject, tap } from 'rxjs';

export interface IModalConfig {
  title?: string;
  content: TemplateRef<any>;
  showSubmitButton?: boolean;
  onSubmit?: Function;
  submitButtonLabel?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  isOpen$ = new BehaviorSubject<boolean>(false);
  content$ = new BehaviorSubject<TemplateRef<any> | null>(null);
  title$ = new BehaviorSubject<string>('');

  config$ = new BehaviorSubject<IModalConfig | null>(null);

  constructor() {
    this.isOpen$.subscribe((open) => {
      if (open) {
        document.body.style.overflowY = 'hidden';
        // document.body.style.paddingRight = '15px';
      } else {
        document.body.style.overflowY = 'scroll';
        // document.body.style.paddingRight = '0px';
      }
    });
  }

  open(config: IModalConfig) {
    this.isOpen$.next(true);
    this.config$.next(config);
  }

  close() {
    this.isOpen$.next(false);
    this.config$.next(null);
  }
}
