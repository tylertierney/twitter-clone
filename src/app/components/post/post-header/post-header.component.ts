import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-header',
  templateUrl: './post-header.component.html',
  styleUrls: ['./post-header.component.css'],
})
export class PostHeaderComponent implements OnInit {
  @Input() user_id: string;
  @Input() username: string;
  @Input() date: string;
  @Input() expanded: boolean;
  @Input() name: string;

  constructor() {}

  ngOnInit(): void {}
}
