import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import {
  APINewReleases,
  FormattedNewReleases,
  Artist,
} from '../models/newRealease.interface';

@Injectable({
  providedIn: 'root',
})
export class SpotifyService {
  token =
    'BQBhNhCa9CpSrq9tOPvsXqva5C-Zdx70R06G2Rb0rCZ-BY9FEvQzQmXxW_dzNWiLX1UKagJy0vYBV0uzM1k';
  // getNewReleases = new Subject;
  constructor(private http: HttpClient) {}

  getQuery(query: string) {
    // definir common url
    const url: string = `https://api.spotify.com/v1/${query}`;
    //definir header con el token especifico
    const headers = new HttpHeaders({
      Authorization: 'Bearer ' + this.token,
    });
    return this.http.get<any>(url, { headers });
  }
  getNewReleases(): Observable<FormattedNewReleases[]> {
    return this.getQuery('browse/new-releases').pipe(
      map((res: APINewReleases) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          const formattedItems: FormattedNewReleases[] = res.albums.items.map(
            ({ id, name, images, type, artists }) => ({
              id,
              images,
              name,
              type,
              artists,
            })
          );
          return formattedItems;
        }
      }),
      catchError((err) => {
        console.log('errror' + err);
        throw new Error(err.message);
      })
    );
  }
  getArtist(termino: string): Observable<Artist[]> {
    return this.getQuery(`search?q=artist:${termino}&type=artist`).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          console.log(res);
          const listArtists: Artist[] = res.artists.items;
          return listArtists;
        }
      }),
      catchError((err) => {
        console.log('errror' + err);
        throw new Error(err.message);
      })
    );
  }
}
