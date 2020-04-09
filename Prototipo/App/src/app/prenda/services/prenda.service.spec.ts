import { TestBed } from '@angular/core/testing';

import { PrendaService } from './prenda.service';

describe('PrendaService', () => {
  let service: PrendaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrendaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
