import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProfileMobileComponent } from './edit-profile-mobile.component';

describe('EditProfileMobileComponent', () => {
  let component: EditProfileMobileComponent;
  let fixture: ComponentFixture<EditProfileMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProfileMobileComponent]
    });
    fixture = TestBed.createComponent(EditProfileMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
