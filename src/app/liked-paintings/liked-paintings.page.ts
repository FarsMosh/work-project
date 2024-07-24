import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LikedPaintingsService } from '../services/liked-paintings.service';

@Component({
  selector: 'app-liked-paintings',
  templateUrl: './liked-paintings.page.html',
  styleUrls: ['./liked-paintings.page.scss'],
})
export class LikedPaintingsPage implements OnInit {
  likedPaintings: any[] = [];

  constructor(private router: Router, private likedPaintingsService: LikedPaintingsService) {}

  ngOnInit() {
    this.likedPaintingsService.likedPaintings$.subscribe(liked => {
      this.likedPaintings = liked;
      console.log('LikedPaintingsPage liked paintings updated:', this.likedPaintings);
    });
  }

  openDetails(painting: any) {
    this.router.navigate(['/painting-details', painting.objectID]);
  }

  getLikedPaintingsInPairs() {
    const pairs = [];
    for (let i = 0; i < this.likedPaintings.length; i += 2) {
      pairs.push([this.likedPaintings[i], this.likedPaintings[i + 1]]);
    }
    return pairs;
  }
}
