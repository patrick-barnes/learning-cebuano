import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WordRootComponent } from './word-root/word-root.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'word-root', component: WordRootComponent },
  { path: '', redirectTo: '/search', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
