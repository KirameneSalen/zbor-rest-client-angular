import { TestBed } from '@angular/core/testing';

import { ZborService } from './zbor.service';

describe('ZborService', () => {
  let service: ZborService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ZborService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
