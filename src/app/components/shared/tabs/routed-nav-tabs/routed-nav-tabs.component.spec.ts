import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoutedNavTabsComponent } from './routed-nav-tabs.component';

describe('RoutedNavTabsComponent', () => {
  let component: RoutedNavTabsComponent;
  let fixture: ComponentFixture<RoutedNavTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoutedNavTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoutedNavTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
