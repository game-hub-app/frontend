import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommIconComponent } from './comm-icon.component';

describe('CommIconComponent', () => {
  let component: CommIconComponent;
  let fixture: ComponentFixture<CommIconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommIconComponent]
    });
    fixture = TestBed.createComponent(CommIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
