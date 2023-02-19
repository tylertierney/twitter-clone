import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TweetSearchResultComponent } from './tweet-search-result.component';

describe('TweetSearchResultComponent', () => {
  let component: TweetSearchResultComponent;
  let fixture: ComponentFixture<TweetSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TweetSearchResultComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TweetSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
