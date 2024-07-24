import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MetApiService {
  private apiUrl = 'https://collectionapi.metmuseum.org/public/collection/v1';
  private involvementApiUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/pKSoTbGzFhj5RtoeFQif';

  constructor(private http: HttpClient) {}

  searchPaintings(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/search?q=${query}&hasImages=true`);
  }

  getPaintingDetails(objectID: number): Observable<any> {
    return this.http.get(`${this.apiUrl}/objects/${objectID}`);
  }

  getCommentsById(itemId: number): Observable<any> {
    return this.http.get(`${this.involvementApiUrl}/comments?item_id=${itemId}`);
  }

  addComment(itemId: number, username: string, comment: string): Observable<any> {
    const body = { item_id: itemId, username, comment };
    return this.http.post(`${this.involvementApiUrl}/comments`, body, {
      headers: { 'Content-Type': 'application/json' },
      responseType: 'text' as 'json', // Force the response type to be text
      observe: 'response' // Request to receive the full HttpResponse
    }).pipe(
      switchMap(response => {
        // Now response is of type HttpResponse<string> and includes the status
        if (response.status === 201) {
          // If the status is 201, return the response body
          return this.getCommentsById(itemId);
        } else {
          // If the status is not 201, throw an error
          return throwError(() => new Error('Error adding comment'));
        }
      })
    );
  }
}
