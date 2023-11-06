import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilenavComponent } from './mobilenav.component';

describe('MobilenavComponent', () => {
  let component: MobilenavComponent;
  let fixture: ComponentFixture<MobilenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MobilenavComponent]
    });
    fixture = TestBed.createComponent(MobilenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
