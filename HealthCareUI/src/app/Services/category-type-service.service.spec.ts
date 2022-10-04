import { TestBed } from '@angular/core/testing';

import { CategoryTypeServiceService } from './category-type-service.service';

describe('CategoryTypeServiceService', () => {
  let service: CategoryTypeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoryTypeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
