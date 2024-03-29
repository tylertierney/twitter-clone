import {
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent {
  content: TemplateRef<any>;
  left = 0;
  top = 0;
  height = 'auto';
  width = 'auto';

  @ViewChild('menu') menu: ElementRef<HTMLMenuElement>;

  constructor() {}

  test(e: Event) {}
}
