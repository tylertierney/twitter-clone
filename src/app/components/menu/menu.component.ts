import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

export interface MenuItem extends Record<string, any> {
  icon?: string;
  onClick: (event: Event) => void;
  label: string;
}

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-menu',
  templateUrl: 'menu.component.html',
  styleUrl: 'menu.component.css',
})
export class MenuComponent {
  @Input() menuItems: MenuItem[];
}
