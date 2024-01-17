import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCommunityComponent } from './delete-community.component';

describe('DeleteCommunityComponent', () => {
  let component: DeleteCommunityComponent;
  let fixture: ComponentFixture<DeleteCommunityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteCommunityComponent]
    });
    fixture = TestBed.createComponent(DeleteCommunityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
