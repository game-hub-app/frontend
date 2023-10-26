/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { RegisterPageService } from './register-page.service';

describe('Service: RegisterPage', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegisterPageService]
    });
  });

  it('should ...', inject([RegisterPageService], (service: RegisterPageService) => {
    expect(service).toBeTruthy();
  }));
});
