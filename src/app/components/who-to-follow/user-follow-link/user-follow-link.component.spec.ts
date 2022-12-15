import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserFollowLinkComponent } from './user-follow-link.component';

describe('UserFollowLinkComponent', () => {
  let component: UserFollowLinkComponent;
  let fixture: ComponentFixture<UserFollowLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserFollowLinkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserFollowLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
