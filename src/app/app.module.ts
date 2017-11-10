import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { UsersPage } from './../pages/users/users';
import { EditUserPage } from './../pages/edit-user/edit-user';
import { AddUserPage } from './../pages/add-user/add-user';
import { IonicStorageModule } from '@ionic/storage';
import { HttpModule } from '@angular/http';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatabaseProvider } from '../providers/database/database';
import { SQLite } from '@ionic-native/sqlite';
import { SQLitePorter } from '@ionic-native/sqlite-porter';
 
@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    AddUserPage,
    UsersPage,
    EditUserPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    AddUserPage,
    UsersPage,
    EditUserPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLitePorter,
    DatabaseProvider
  ]
})
export class AppModule {}
