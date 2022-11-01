import { TestBed } from '@angular/core/testing';

import { TerapeutaService } from './terapeuta.service';

describe('TerapeutaService', () => {
  let service: TerapeutaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TerapeutaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
