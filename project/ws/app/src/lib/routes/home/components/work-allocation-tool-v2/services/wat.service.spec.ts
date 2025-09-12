import { TestBed } from '@angular/core/testing';

import { WatService } from './wat.service';

describe('WatService', () => {
  let service: WatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
