import { TestBed } from '@angular/core/testing';

import { EditPostService } from './edit-post.service';

describe('EditPostService', () => {
  let service: EditPostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditPostService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
