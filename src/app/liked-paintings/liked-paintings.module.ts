import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LikedPaintingsPageRoutingModule } from './liked-paintings-routing.module';

import { LikedPaintingsPage } from './liked-paintings.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LikedPaintingsPageRoutingModule
  ],
  declarations: [LikedPaintingsPage]
})
export class LikedPaintingsPageModule {}
