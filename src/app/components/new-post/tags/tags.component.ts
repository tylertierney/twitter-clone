import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  ElementRef,
  inject,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { filter, map, ReplaySubject, Subject, withLatestFrom } from 'rxjs';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TagsComponent implements AfterViewInit, OnInit {
  @ViewChild('input') input: ElementRef<HTMLInputElement>;
  @Output() tag = new ReplaySubject<string>(1);

  formGroup = new FormGroup({
    tag: new FormControl('', { nonNullable: true }),
  });
  constructor() {}

  ngAfterViewInit(): void {
    this.input.nativeElement.focus();
  }

  addTagSubject = new Subject<void>();

  destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    this.addTagSubject
      .pipe(
        withLatestFrom(
          this.formGroup.controls.tag.valueChanges,
          (_, tag) => tag
        ),
        map((text) => text.toLowerCase()),
        filter(Boolean),
        map((text) => text.trim().replace(/ /g, '')),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((tag) => {
        this.tag.next(tag);
        this.formGroup.controls.tag.patchValue('', { emitEvent: false });
      });
  }
}
