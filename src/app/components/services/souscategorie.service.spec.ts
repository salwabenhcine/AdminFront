import { TestBed } from '@angular/core/testing';

import { SouscategorieService } from './souscategorie.service';

describe('SouscategorieService', () => {
  let service: SouscategorieService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SouscategorieService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
