import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable } from 'rxjs';
import { ITracks, Track } from '../models/tracks.interface';
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
    'BQB8oRz2aqldSFcO1S7ogCbYAyXSFVeA6bY_u2A1vgzImkDYQOJNaE1ENk_m6f3CojvcZnrJpICMb141HBY';
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
  getArtistPorId(id: string): Observable<Artist> {
    return this.getQuery(`artists/${id}`).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          const artista: Artist = res;
          return artista;
        }
      }),
      catchError((err) => {
        console.log('error' + err);
        throw new Error(err.message);
      })
    );
  }
  getTopTracks(id: string): Observable<ITracks> {
    return this.getQuery(`artists/${id}/top-tracks?market=ES`).pipe(
      map((res) => {
        if (!res) {
          throw new Error('Value expected!');
        } else {
          return res;
        }
      }),
      catchError((err) => {
        console.log('error' + err);
        throw new Error(err.message);
      })
    );
  }
}
