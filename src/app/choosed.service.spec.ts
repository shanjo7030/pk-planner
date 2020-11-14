import { TestBed } from '@angular/core/testing';

import { ChoosedService } from './choosed.service';

describe('ChoosedService', () => {
  let service: ChoosedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChoosedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
