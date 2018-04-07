import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StripHtmlPipe } from '../../pipes/strip-html/strip-html';

@NgModule({
  declarations: [
    StripHtmlPipe,
  ],
  imports: [
    IonicPageModule.forChild(StripHtmlPipe),
  ],
})
export class StripHtmlPipeModule {}
