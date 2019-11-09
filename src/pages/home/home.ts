import { Component } from '@angular/core';
import { IonicPage, NavController, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public alertCtrl: AlertController) {
  }

  onQrcode(nome:string, atividade:string){
    if(nome == "" || atividade == "" || atividade == null){
      let alert = this.alertCtrl.create({
        title: 'Algum dado não informado',
        subTitle: '',
        buttons: ['OK']
      });
      alert.present();
    } else {
      this.navCtrl.push("QrcodePage", {"nome": nome, "atividade": atividade});
    }
  }

  onQrcodeVoluntario(){
    this.navCtrl.push("QrcodeVoluntarioPage");
  }

}
