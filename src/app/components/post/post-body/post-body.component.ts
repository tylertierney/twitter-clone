import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-body',
  templateUrl: './post-body.component.html',
  styleUrls: ['./post-body.component.css'],
})
export class PostBodyComponent implements OnInit {
  @Input() expanded: boolean;
  @Input() text: string;

  constructor() {}

  ngOnInit(): void {}
}
