import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QrcodeVoluntarioPage } from './qrcode-voluntario';

@NgModule({
  declarations: [
    QrcodeVoluntarioPage,
  ],
  imports: [
    IonicPageModule.forChild(QrcodeVoluntarioPage),
  ],
})
export class QrcodeVoluntarioPageModule {}
