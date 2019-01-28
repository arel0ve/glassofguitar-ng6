import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChooseSongPageComponent } from './choose-song-page.component';


const routes: Routes = [
  {
    path: '',
    component: ChooseSongPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseSongPageRoutingModule { }
