import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import {
  IModalConfig,
  ModalService,
} from '../../../services/modal/modal.service';
import { CommonModule } from '@angular/common';
import { SubmitButtonComponent } from '../submit-button/submit-button.component';

@Component({
  standalone: true,
  imports: [CommonModule, SubmitButtonComponent],
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  // @Input() content: TemplateRef<any>;
  // @Input() title: string;
  // @Input() config: IModalConfig;

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  test(e: Event) {
    e.stopPropagation();
  }
}
