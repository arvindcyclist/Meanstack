import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './components/list/list.component';
import { EditComponent } from './components/edit/edit.component';
import { CreateComponent } from './components/create/create.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';


const routes: Routes = [
  {path : 'list', component : ListComponent},
  {path : 'edit/:id', component : EditComponent},
  {path : 'create', component : CreateComponent},
  {path : '', redirectTo : 'list', pathMatch : 'full'},
  {path : '**', component : PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const RoutingComponent = [ ListComponent,
                                  EditComponent,
                                  CreateComponent,
                                  PageNotFoundComponent
                                ]
