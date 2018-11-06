import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViewDealPage } from './view-deal';
import { NgxQRCodeModule } from 'ngx-qrcode2';


@NgModule({
  declarations: [
    ViewDealPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewDealPage),
    NgxQRCodeModule
  ],
})
export class ViewDealPageModule {}
