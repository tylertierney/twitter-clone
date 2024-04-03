import { Injectable, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

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

  config$ = new BehaviorSubject<IModalConfig | null>(null);

  constructor() {
    this.isOpen$.subscribe((open) => {
      if (open) {
        document.body.style.overflowY = 'hidden';
      } else {
        document.body.style.overflowY = 'scroll';
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
