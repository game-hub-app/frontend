import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostMobileComponent } from './new-post-mobile.component';

describe('NewPostMobileComponent', () => {
  let component: NewPostMobileComponent;
  let fixture: ComponentFixture<NewPostMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPostMobileComponent]
    });
    fixture = TestBed.createComponent(NewPostMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
