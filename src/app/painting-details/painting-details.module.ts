import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaintingDetailsPageRoutingModule } from './painting-details-routing.module';

import { PaintingDetailsPage } from './painting-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaintingDetailsPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [PaintingDetailsPage]
})
export class PaintingDetailsPageModule {}
