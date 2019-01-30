import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: './workspace-page/workspace-page.module#WorkspacePageModule'
  },
  {
    path: 'song/:artist/:song/:version',
    loadChildren: './workspace-page/workspace-page.module#WorkspacePageModule'
  },
  {
    path: 'user/:login',
    loadChildren: './choose-song-page/choose-song-page.module#ChooseSongPageModule'
  },
  {
    path: 'songs',
    loadChildren: './choose-song-page/choose-song-page.module#ChooseSongPageModule',
  },
  {
    path: 'songs/:artist',
    loadChildren: './choose-song-page/choose-song-page.module#ChooseSongPageModule',
  },
  {
    path: 'songs/:artist/:title',
    loadChildren: './choose-song-page/choose-song-page.module#ChooseSongPageModule'
  },
  {
    path: 'todo/:mode',
    loadChildren: './todo/todo.module#TodoModule',
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
