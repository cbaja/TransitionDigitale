import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetailsProjetPage } from './details-projet';

@NgModule({
  declarations: [
    DetailsProjetPage,
  ],
  imports: [
    IonicPageModule.forChild(DetailsProjetPage),
  ],
})
export class DetailsProjetPageModule {}
