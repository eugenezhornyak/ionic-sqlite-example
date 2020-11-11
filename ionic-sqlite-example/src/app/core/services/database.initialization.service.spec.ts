import { TestBed } from '@angular/core/testing';

import { DatabaseInitializationService } from './database.initialization.service';

describe('DatabaseInitializationService', () => {
  let service: DatabaseInitializationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatabaseInitializationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
