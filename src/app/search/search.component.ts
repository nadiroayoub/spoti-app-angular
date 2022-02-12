import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { Artist } from '../models/newRealease.interface';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  termino: string = '';
  listArtists: Artist[] = [];
  loading?: boolean;
  showModal: boolean = false;
  constructor(private _spotifyService: SpotifyService) {}

  ngOnInit(): void {}
  search(termino: string) {
    this.loading = true;
    this.termino = termino;
    if (termino.trim() !== '' && termino.length !== 0) {
      this._spotifyService.getArtist(termino).subscribe(
        (data) => {
          this.loading = false;
          this.listArtists = data;
          if (this.listArtists.length === 0) {
            this.showModal = true;
          } else {
            this.showModal = false;
          }
        },
        (err) => {
          console.log(err.message);
        },
        () => {
          console.log('Completed');
        }
      );
    }
  }
}
