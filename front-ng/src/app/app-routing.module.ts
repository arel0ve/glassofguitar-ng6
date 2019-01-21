import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: './workspace/workspace.module#WorkspaceModule'
  },
  {
    path: 'user/:user',
    redirectTo: 'user/:user/0',
    pathMatch: 'full'
  },
  {
    path: 'user/:user/:song',
    loadChildren: './workspace/workspace.module#WorkspaceModule'
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
