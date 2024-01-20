import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchModalDesktopComponent } from './search-modal-desktop.component';

describe('SearchModalDesktopComponent', () => {
  let component: SearchModalDesktopComponent;
  let fixture: ComponentFixture<SearchModalDesktopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchModalDesktopComponent]
    });
    fixture = TestBed.createComponent(SearchModalDesktopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
