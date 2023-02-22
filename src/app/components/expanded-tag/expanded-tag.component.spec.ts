import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedTagComponent } from './expanded-tag.component';

describe('ExpandedTagComponent', () => {
  let component: ExpandedTagComponent;
  let fixture: ComponentFixture<ExpandedTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedTagComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandedTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
