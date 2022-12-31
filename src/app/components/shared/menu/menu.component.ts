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
export class MenuComponent implements OnInit {
  content: TemplateRef<any>;
  left = 0;
  top = 0;

  @ViewChild('menu') menu: ElementRef<HTMLMenuElement>;

  constructor() {}

  ngOnInit(): void {}
}
