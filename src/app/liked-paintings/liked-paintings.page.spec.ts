import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LikedPaintingsPage } from './liked-paintings.page';

describe('LikedPaintingsPage', () => {
  let component: LikedPaintingsPage;
  let fixture: ComponentFixture<LikedPaintingsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(LikedPaintingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
