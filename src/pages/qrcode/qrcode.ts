import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { File } from '@ionic-native/file';

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  voluntario:string;
  atividade:string;
  url:string = "http://192.168.15.4/citi/citi.php"

  constructor(public navCtrl: NavController, public navParams: NavParams, public scanner: BarcodeScanner, public file:File, public alertCtrl: AlertController, public http: HttpClient, public loading: LoadingController) {
    this.voluntario = this.navParams.get("nome")
    this.atividade = this.navParams.get("atividade");

    this.file.createFile(this.file.externalRootDirectory, "citi2019_bkp.csv", false);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  escanear(){
    this.scanner.scan().then((data) => {
      if(data.text.indexOf("#") == -1){
        let alert = this.alertCtrl.create({
          title: 'QRCode inválido',
          subTitle: '',
          buttons: ['OK']
        });
        alert.present();
      } else {
        let dados:any = data.text.split("#");

        let alert = this.alertCtrl.create({
          title: 'Registrar presença de '+dados[1]+"?",
          subTitle: '',
          buttons: [
            {
              text: 'Não',
              handler: () => {
            }
            },{
              text: 'Sim',
              handler: () => {
                let date:Date = new Date();
                let dateText:string = date.getFullYear()+"-"+date.getMonth()+"-"+date.getDate()+" "+date.getHours()+":"+date.getMinutes()+":"+date.getSeconds();
                let text:string = dados[0]+","+dados[1]+","+this.atividade+","+dateText+","+this.voluntario+"\n";

                this.file.writeFile(this.file.externalRootDirectory, "citi2019_bkp.csv", text, {replace: false, append:true});

                let loading = this.loading.create({ content: "Registrando" });
                loading.present();

                this.http.get(this.url+"?cpf="+dados[0]+"&nome="+dados[1]+"&atividade="+this.atividade+"&data="+dateText+"&voluntario="+this.voluntario).subscribe(res => {
                  loading.dismiss();
                }, err => {
                  loading.dismiss();
                  let alert = this.alertCtrl.create({
                    title: 'Erro de conexão',
                    subTitle: 'Não foi possível conectar ao banco de dados',
                    buttons: ['OK']
                  });
                  alert.present();
                });
            }
          }]
        });
        alert.present();
      }
    })
  }
}
