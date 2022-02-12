import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { ArtistaComponent } from './artista/artista.component';

const routes: Routes = [
  {
    // default route
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    // route => pagina inicial
    path: 'home',
    component: HomeComponent,
  },
  {
    // route => pagina inicial
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'artist/:id',
    component: ArtistaComponent,
  },
  {
    path: '**',
    component: HomeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
