import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-button',
  templateUrl: './post-button.component.html',
  styleUrls: ['./post-button.component.css'],
})
export class PostButtonComponent implements OnInit {
  @Input() value: number = 123;
  @Input() color: 'pink' | 'green' | 'blue';

  constructor() {}

  ngOnInit(): void {}
}
