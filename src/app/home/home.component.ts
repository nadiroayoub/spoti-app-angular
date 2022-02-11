import { Component, OnInit } from '@angular/core';
import { SpotifyService } from '../services/spotify.service';
import { NewReleasesItem } from '../models/newRealease.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  newRelease: NewReleasesItem[] = [];
  error: boolean = false;
  loading: boolean = true;
  messageError: string = '';
  // data;
  constructor(private _spotifyService: SpotifyService) {
    this.messageError = '';
    this._spotifyService.getNewReleases();
  }

  ngOnInit(): void {
    this.getNewReleases();
  }
  // llamar el servicio  para obtener new releases desde spotify
  getNewReleases(): void {
    this._spotifyService.getNewReleases().subscribe(
      (data: any) => {
        this.loading = false;
        this.newRelease = data;
        console.log('Data: ', data);
      },
      (err) => {
        console.log('Error: ', err);
        console.log(err.message);
      },
      () => {
        console.log('Completed!');
      }
    );
  }
}
