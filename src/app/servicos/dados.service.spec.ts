import { TestBed } from '@angular/core/testing';

import { DadosBarService } from './dados.service';

describe('DadosBarService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DadosBarService = TestBed.get(DadosBarService);
    expect(service).toBeTruthy();
  });
});
