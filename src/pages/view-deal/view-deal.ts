import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AdddealsProvider } from '../../providers/adddeals/adddeals';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

/**
 * Generated class for the ViewDealPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-view-deal',
  templateUrl: 'view-deal.html',
})
export class ViewDealPage {
  itemId: any;
  viewData: any
  deals: any;

  constructor(public navCtrl: NavController,private firestore: AdddealsProvider, public navParams: NavParams, private auth: AuthService) {
    let id = this.navParams.get('id')
    console.log(id)
    this.firestore.getDeal(id)
     .subscribe(res =>{
       console.log(res)
      //now we will bind the data to the ngMOdel 
       this.viewData =  res; 
    //  })
  })
}
  ionViewDidLoad() {
    console.log('ionViewDidLoad ViewDealPage');
  }
  getDeals(){
    this.firestore.getInfluencerDeals(this.auth.getUid()).pipe(     
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
  ngOnInit(){
    this.getDeals()
  }

}
