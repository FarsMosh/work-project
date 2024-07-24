import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaintingDetailsPage } from './painting-details.page';

describe('PaintingDetailsPage', () => {
  let component: PaintingDetailsPage;
  let fixture: ComponentFixture<PaintingDetailsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaintingDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
