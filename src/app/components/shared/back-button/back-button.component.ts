import { Component } from '@angular/core';
import { CommonModule, Location } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-back-button',
  templateUrl: './back-button.component.html',
  styleUrls: ['./back-button.component.css'],
})
export class BackButtonComponent {
  constructor(public location: Location) {}
}
