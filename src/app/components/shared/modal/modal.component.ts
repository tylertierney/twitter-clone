import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ModalService } from '../../../services/modal/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnInit {
  @Input() content: TemplateRef<any>;

  constructor(public modalService: ModalService) {}

  ngOnInit(): void {}

  test(e: Event) {
    e.stopPropagation();
  }
}
