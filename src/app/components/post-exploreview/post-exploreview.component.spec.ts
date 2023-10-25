import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostExploreviewComponent } from './post-exploreview.component';

describe('PostExploreviewComponent', () => {
  let component: PostExploreviewComponent;
  let fixture: ComponentFixture<PostExploreviewComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PostExploreviewComponent]
    });
    fixture = TestBed.createComponent(PostExploreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
