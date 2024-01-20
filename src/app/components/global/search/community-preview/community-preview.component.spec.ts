import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommunityPreviewComponent } from './community-preview.component';

describe('CommunityPreviewComponent', () => {
  let component: CommunityPreviewComponent;
  let fixture: ComponentFixture<CommunityPreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CommunityPreviewComponent]
    });
    fixture = TestBed.createComponent(CommunityPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
