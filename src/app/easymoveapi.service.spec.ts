import { TestBed } from '@angular/core/testing';

import { EasymoveapiService } from './easymoveapi.service';

describe('EasymoveapiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EasymoveapiService = TestBed.get(EasymoveapiService);
    expect(service).toBeTruthy();
  });
});
