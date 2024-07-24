import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PaintingDetailsPage } from './painting-details.page';

const routes: Routes = [
  {
    path: '',
    component: PaintingDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PaintingDetailsPageRoutingModule {}
