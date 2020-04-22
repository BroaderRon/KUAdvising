import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HttpService } from './http.service';
import { ReactiveFormsModule } from '@angular/forms';

describe('HttpService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ReactiveFormsModule,HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: HttpService = TestBed.get(HttpService);
    expect(service).toBeTruthy();
  });
});



