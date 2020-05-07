import { TestBed } from '@angular/core/testing';

import { AtuendoService } from './atuendo.service';

describe('AtuendoService', () => {
  let service: AtuendoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtuendoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
