import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandedPostComponent } from './expanded-post.component';

describe('ExpandedPostComponent', () => {
  let component: ExpandedPostComponent;
  let fixture: ComponentFixture<ExpandedPostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpandedPostComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandedPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
