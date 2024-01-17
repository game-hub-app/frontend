import { TestBed } from '@angular/core/testing';

import { EditCommunityService } from './edit-community.service';

describe('EditCommunityService', () => {
  let service: EditCommunityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditCommunityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
