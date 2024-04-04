import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface IRoutedTab {
  label: string;
  routerLink: string;
}

@Component({
  standalone: true,
  imports: [CommonModule, RouterModule],
  selector: 'app-routed-nav-tabs',
  templateUrl: './routed-nav-tabs.component.html',
  styleUrls: ['../tabs.component.css'],
})
export class RoutedNavTabsComponent {
  @Input() tabs: IRoutedTab[];
}
