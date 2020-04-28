import { TestBed } from '@angular/core/testing';

import { CurUserService } from './cur-user.service';

describe('CurUserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CurUserService = TestBed.get(CurUserService);
    expect(service).toBeTruthy();
  });
});
