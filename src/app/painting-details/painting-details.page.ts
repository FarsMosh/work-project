import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MetApiService } from '../services/met-api.service';
import { LikedPaintingsService } from '../services/liked-paintings.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms'; // Import Validators

@Component({
  selector: 'app-painting-details',
  templateUrl: './painting-details.page.html',
  styleUrls: ['./painting-details.page.scss'],
})
export class PaintingDetailsPage implements OnInit {
  painting: any;
  comments: any[] = [];
  isLiked: boolean = false;
  likedPaintings: any[] = [];
  commentForm: FormGroup; // Reactive form group

  constructor(
    private route: ActivatedRoute,
    private metApiService: MetApiService,
    private likedPaintingsService: LikedPaintingsService,
    private fb: FormBuilder // FormBuilder for reactive forms
  ) {
    this.commentForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern('^[a-zA-Z ]*$'), Validators.minLength(2)]],
      comment: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.likedPaintingsService.likedPaintings$.subscribe(liked => {
      this.likedPaintings = liked;
      const paintingIdStr = this.route.snapshot.paramMap.get('id');
      if (paintingIdStr) {
        const paintingId = Number(paintingIdStr);
        if (paintingId) {
          this.metApiService.getPaintingDetails(paintingId).subscribe((details: any) => {
            this.painting = details;
            this.isLiked = this.likedPaintingsService.isLiked(this.painting.objectID);
          });

          this.loadComments(paintingId);
        }
      }
    });
  }

  loadComments(paintingId: number) {
    console.log('Loading comments for painting ID:', paintingId);
    this.metApiService.getCommentsById(paintingId).subscribe((comments: any[]) => {
      console.log('Comments loaded:', comments);
      this.comments = comments;
    });
  }

  addComment() {
    const paintingIdStr = this.route.snapshot.paramMap.get('id');
    if (paintingIdStr) {
      const paintingId = Number(paintingIdStr);
      if (paintingId && this.commentForm.valid) {
        const { username, comment } = this.commentForm.value;
        this.metApiService.addComment(paintingId, username, comment).subscribe(
          (response: any) => {
            if (typeof response === 'string' && response === 'Created') {
              console.log('Comment successfully added but response is not JSON.');
            } else {
              console.log('Comment successfully added with JSON response:', response);
            }
            this.commentForm.reset(); // Clear the form
            this.loadComments(paintingId); // Reload the comments
          },
          (error) => {
            console.error('Error adding comment:', error);
          }
        );
      }
    }
  }

  toggleLike() {
    this.isLiked = !this.isLiked;
    if (this.isLiked) {
      this.likedPaintingsService.addLikedPainting(this.painting);
    } else {
      this.likedPaintingsService.removeLikedPainting(this.painting.objectID);
    }
  }
}
