import { TestBed } from '@angular/core/testing';

import { OperacionService } from './operacion.service';

describe('OperacionService', () => {
  let service: OperacionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
