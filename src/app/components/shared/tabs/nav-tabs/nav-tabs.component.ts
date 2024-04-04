import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-nav-tabs',
  templateUrl: './nav-tabs.component.html',
  styleUrls: ['../tabs.component.css'],
})
export class NavTabsComponent implements OnInit {
  selectedTab: string;
  @Input() tabs: string[];
  @Output() selectTab = new EventEmitter<string>();

  ngOnInit(): void {
    this.selectedTab = this.tabs[0];
  }

  setActiveTab(label: string) {
    this.selectedTab = label;
    this.selectTab.emit(label);
  }
}
