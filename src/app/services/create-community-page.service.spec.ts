/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CreateCommunityPageService } from './create-community-page.service';

describe('Service: CreateCommunityPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CreateCommunityPageService]
    });
  });

  it('should ...', inject([CreateCommunityPageService], (service: CreateCommunityPageService) => {
    expect(service).toBeTruthy();
  }));
});
