import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { faHeart } from '@fortawesome/free-regular-svg-icons';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-post-button',
  templateUrl: './post-button.component.html',
  styleUrls: ['./post-button.component.css'],
})
export class PostButtonComponent implements OnInit {
  @Input() value: number;
  @Input() color: 'pink' | 'green' | 'blue';
  @Output() onClick = new EventEmitter();
  @Input() isActive: boolean;
  @Input() type: 'like' | 'retweet' | 'reply';
  faHeart = faHeart;

  constructor() {}

  ngOnInit(): void {}

  clicked(e: Event) {
    e.stopPropagation();
    this.onClick.emit(e);
  }
}
