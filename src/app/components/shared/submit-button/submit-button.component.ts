import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-submit-button',
  templateUrl: './submit-button.component.html',
  styleUrls: ['./submit-button.component.css'],
})
export class SubmitButtonComponent implements OnInit {
  @Input() type: 'outline' | 'primary' | 'secondary' = 'primary';
  @Output() click = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}
}
