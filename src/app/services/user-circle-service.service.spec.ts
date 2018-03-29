import { TestBed, inject } from '@angular/core/testing';

import { UserCircleServiceService } from './user-circle-service.service';

describe('UserCircleServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserCircleServiceService]
    });
  });

  it('should be created', inject([UserCircleServiceService], (service: UserCircleServiceService) => {
    expect(service).toBeTruthy();
  }));
});
