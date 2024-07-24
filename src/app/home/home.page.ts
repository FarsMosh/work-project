import { Component, OnInit } from '@angular/core';
import { MetApiService } from '../services/met-api.service';
import { Router } from '@angular/router';
import { LikedPaintingsService } from '../services/liked-paintings.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  paintings: any[] = [];
  currentBatch: number = 0;
  batchSize: number = 10;
  allObjectIDs: number[] = [];
  likedPaintings: any[] = [];

  constructor(
    private metApiService: MetApiService,
    private router: Router,
    private likedPaintingsService: LikedPaintingsService
  ) {}

  ngOnInit() {
    this.likedPaintingsService.likedPaintings$.subscribe(liked => {
      this.likedPaintings = liked;
      this.paintings.forEach(painting => {
        painting.liked = this.likedPaintingsService.isLiked(painting.objectID);
      });
    });

    this.metApiService.searchPaintings('painting').subscribe((response: any) => {
      if (response.objectIDs) {
        this.allObjectIDs = response.objectIDs;
        this.loadMorePaintings();
      }
    });
  }

  loadMorePaintings() {
    const nextBatch = this.allObjectIDs.slice(this.currentBatch, this.currentBatch + this.batchSize);
    nextBatch.forEach((objectID: number) => {
      this.metApiService.getPaintingDetails(objectID).subscribe((details: any) => {
        if (details.primaryImage !== '') {
          details.liked = this.likedPaintingsService.isLiked(details.objectID);
          this.paintings.push(details);
        }
      });
    });
    this.currentBatch += this.batchSize;
  }

  toggleLike(painting: any) {
    painting.liked = !painting.liked;
    if (painting.liked) {
      this.likedPaintingsService.addLikedPainting(painting);
    } else {
      this.likedPaintingsService.removeLikedPainting(painting.objectID);
    }
  }

  viewDetails(painting: any) {
    this.router.navigate(['/painting-details', painting.objectID]);
  }
}
