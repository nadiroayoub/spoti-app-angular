import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { SpotifyService } from '../services/spotify.service';
import { Artist, Owner, Tracks } from '../models/newRealease.interface';
import { Track } from '../models/tracks.interface';

@Component({
  selector: 'app-artista',
  templateUrl: './artista.component.html',
  styleUrls: ['./artista.component.scss'],
})
export class ArtistaComponent implements OnInit {
  private _routeSub: Subscription | undefined;
  artista: Artist | undefined;
  topTracks: Track[] | undefined;
  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) {}
  ngOnInit(): void {
    this._routeSub = this.route.params.subscribe((params) => {
      this.spotifyService.getArtistPorId(params['id']).subscribe(
        (data) => {
          this.artista = data;
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log('Completed!');
        }
      );
      this.spotifyService.getTopTracks(params['id']).subscribe(
        (data) => {
          this.topTracks = data.tracks;
          // console.log(this.topTracks.image);
        },
        (err) => {
          console.error(err);
        },
        () => {
          console.log();
        }
      );
    });
  }
}
