import { TestBed } from '@angular/core/testing';

import { TailwindService } from './tailwind.service';

describe('TailwindService', () => {
  let service: TailwindService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TailwindService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
