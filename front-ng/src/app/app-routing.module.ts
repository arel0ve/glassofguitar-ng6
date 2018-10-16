import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkspaceComponent} from './workspace/workspace.component';
import {TodoComponent} from './todo/todo.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent
  },
  {
    path: 'user/:user',
    redirectTo: 'user/:user/0',
    pathMatch: 'full'
  },
  {
    path: 'user/:user/:song',
    component: WorkspaceComponent
  },
  {
    path: 'todo/:mode',
    component: TodoComponent,
    runGuardsAndResolvers: 'always'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule {}
