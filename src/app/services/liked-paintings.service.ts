import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LikedPaintingsService {
  private likedPaintingsSubject = new BehaviorSubject<any[]>(this.loadLikedPaintings());
  likedPaintings$ = this.likedPaintingsSubject.asObservable();

  constructor() {}

  getLikedPaintings() {
    return this.likedPaintings$.subscribe();
  }

  addLikedPainting(painting: any) {
    const currentLiked = this.likedPaintingsSubject.getValue();
    currentLiked.push(painting);
    this.likedPaintingsSubject.next(currentLiked);
    this.saveLikedPaintings(currentLiked);
  }

  removeLikedPainting(paintingId: number) {
    const currentLiked = this.likedPaintingsSubject.getValue().filter(p => p.objectID !== paintingId);
    this.likedPaintingsSubject.next(currentLiked);
    this.saveLikedPaintings(currentLiked);
  }

  private loadLikedPaintings() {
    const saved = localStorage.getItem('likedPaintings');
    return saved ? JSON.parse(saved) : [];
  }

  private saveLikedPaintings(likedPaintings: any[]) {
    localStorage.setItem('likedPaintings', JSON.stringify(likedPaintings));
  }

  isLiked(objectID: number): boolean {
    return this.likedPaintingsSubject.getValue().some(p => p.objectID === objectID);
  }
}
