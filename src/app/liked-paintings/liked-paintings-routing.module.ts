import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LikedPaintingsPage } from './liked-paintings.page';

const routes: Routes = [
  {
    path: '',
    component: LikedPaintingsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LikedPaintingsPageRoutingModule {}
 