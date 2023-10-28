import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewPostExploreviewComponent } from './new-post-exploreview.component';

describe('NewPostExploreviewComponent', () => {
  let component: NewPostExploreviewComponent;
  let fixture: ComponentFixture<NewPostExploreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewPostExploreviewComponent]
    });
    fixture = TestBed.createComponent(NewPostExploreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
