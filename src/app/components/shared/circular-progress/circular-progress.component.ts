import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-circular-progress',
  templateUrl: './circular-progress.component.html',
  styleUrls: ['./circular-progress.component.css'],
})
export class CircularProgressComponent implements OnChanges {
  @Input() val: number = 0;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['val']);
  }

  // change(e: Event) {
  //   this.val = parseInt((e.target as HTMLInputElement).value, 10);
  // }
}
