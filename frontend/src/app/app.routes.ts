import { Routes } from '@angular/router';
import { AjouterLotComponent } from './pages/ajouter-lot/ajouter-lot';
import { OeufEclotComponent } from './pages/oeuf-eclot/oeuf-eclot';
import { ResenserOeufComponent } from './pages/resenser-oeuf/resenser-oeuf';

  export const routes: Routes = [
  { path: 'ajouter-lot', component: AjouterLotComponent },
  { path: 'oeuf-eclot', component: OeufEclotComponent },
  { path: 'resenser-oeuf', component: ResenserOeufComponent },
  { path: '', redirectTo: 'ajouter-lot', pathMatch: 'full' }
];

