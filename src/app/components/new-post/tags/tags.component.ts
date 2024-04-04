import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { SubmitButtonComponent } from '../../shared/submit-button/submit-button.component';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SubmitButtonComponent,
  ],
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.css'],
})
export class TagsComponent implements AfterViewInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @Output() tag = new EventEmitter<string>();
  text = '';

  constructor(private fb: FormBuilder) {}

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  addTag(text: string): void {
    if (!text) return;
    const trimmed = text.toLowerCase().trim().replace(' ', '');
    this.tag.emit(trimmed);
    this.text = '';
  }
}
