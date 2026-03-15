import { Routes } from '@angular/router';
import { AjouterLotComponent } from './pages/ajouter-lot/ajouter-lot';
import { ResenserOeufComponent } from './pages/resenser-oeuf/resenser-oeuf';
import { AjouterMortComponent } from './pages/ajouter-mort/ajouter-mort';
import { DashboardComponent } from './pages/dashboard/dashboard';

  export const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ajouter-lot', component: AjouterLotComponent },
  { path: 'resenser-oeuf', component: ResenserOeufComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'ajouter-mort', component: AjouterMortComponent}
];

    