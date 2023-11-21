/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NewPostMobileService } from './new-post-mobile.service';

describe('Service: NewPostMobile', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NewPostMobileService]
    });
  });

  it('should ...', inject([NewPostMobileService], (service: NewPostMobileService) => {
    expect(service).toBeTruthy();
  }));
});
