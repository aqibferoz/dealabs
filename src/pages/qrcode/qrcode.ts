import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdddealsProvider } from '../../providers/adddeals/adddeals';
import { map } from 'rxjs/operators';

/**
 * Generated class for the QrcodePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-qrcode',
  templateUrl: 'qrcode.html',
})
export class QrcodePage {
  deals: { id: string; }[];

  constructor(public navCtrl: NavController,public firestore : AdddealsProvider, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QrcodePage');
  }

  getDeals(){
    this.firestore.getInfluencerDeals(this.uid).pipe(     
      map(actions => actions.map(a => {      //.map, what kind of data i need i.e. data, id
        const data = a.payload.doc.data() ;
        const id = a.payload.doc.id;
        return { id, ...data };

      }))).subscribe(response=>{      //.subscribe, now i need data 
        this.deals = response;    
        console.log(this.deals);
       //
      })
  }
  uid(uid: any): any {
    throw new Error("Method not implemented.");
  }

}
