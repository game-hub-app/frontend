import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityListMobileComponent } from './community-list-mobile.component';

describe('CommunityListMobileComponent', () => {
  let component: CommunityListMobileComponent;
  let fixture: ComponentFixture<CommunityListMobileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityListMobileComponent]
    });
    fixture = TestBed.createComponent(CommunityListMobileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
