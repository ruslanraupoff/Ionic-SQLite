import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { DatabaseProvider } from './../../providers/database/database';

@IonicPage()
@Component({
  selector: 'page-edit-user',
  templateUrl: 'edit-user.html',
})
export class EditUserPage {
  user ={id: 0, firstname: "", lastname: ""};

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private databaseprovider: DatabaseProvider,
    public toastCtrl: ToastController ) {
      this.getCurrentData(navParams.get("user"));
  }

  getCurrentData(user) {
    this.user.id = user.id;
    this.user.firstname = user.firstname;
    this.user.lastname= user.lastname;
  }

  editUser(){
    this.databaseprovider.editUser(this.user['firstname'], this.user['lastname'], this.user['id'])
    .then(() => {
      let toast = this.toastCtrl.create({
        message: 'User: ' + this.user['firstname'] + ' updated!',
        duration: 3000
      });
      toast.present();
      console.log('User updated!');
      this.navCtrl.popToRoot();
    })
    .catch(e => console.log(e));
  }

}
