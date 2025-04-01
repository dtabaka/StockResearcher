import { TestBed } from '@angular/core/testing';

import { AppStateService } from './appstate.service';

describe('AppstateService', () => {
  let service: AppStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
