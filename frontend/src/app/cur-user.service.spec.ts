import { TestBed } from '@angular/core/testing';

import { DataService } from './cur-user.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('DataService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule]
  }));

  it('should be created', () => {
    const service: DataService = TestBed.get(DataService);
    expect(service).toBeTruthy();
  });
});
