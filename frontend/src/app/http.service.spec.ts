import { TestBed } from '@angular/core/testing';

import { HttpService } from './http.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule]
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});



