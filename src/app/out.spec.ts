import { TestBed } from '@angular/core/testing';

import { Out } from './out';

describe('Out', () => {
  let service: Out;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Out);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
