import { Component, Input } from '@angular/core';

export interface IRoutedTab {
  label: string;
  routerLink: string;
}

@Component({
  selector: 'app-routed-nav-tabs',
  templateUrl: './routed-nav-tabs.component.html',
  styleUrls: ['../tabs.component.css'],
})
export class RoutedNavTabsComponent {
  @Input() tabs: IRoutedTab[];
}
