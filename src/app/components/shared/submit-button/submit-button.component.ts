import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css'],
})
export class SubmitButtonComponent {
  @Input() type: 'outline' | 'primary' | 'secondary' | 'danger' = 'primary';
  @Output() onClick = new EventEmitter();

  constructor() {}
}
