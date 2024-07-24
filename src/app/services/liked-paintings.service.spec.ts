import { TestBed } from '@angular/core/testing';

import { LikedPaintingsService } from './liked-paintings.service';

describe('LikedPaintingsService', () => {
  let service: LikedPaintingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedPaintingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
