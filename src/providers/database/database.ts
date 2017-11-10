import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/Rx';
import { Storage } from '@ionic/storage';

import { SQLitePorter } from '@ionic-native/sqlite-porter';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string = "users.db";

@Injectable()
export class DatabaseProvider {
  private db: SQLiteObject;
  private databaseReady: BehaviorSubject<boolean>;

  constructor(
      public sqlitePorter: SQLitePorter, 
      private storage: Storage, 
      private sqlite: SQLite, 
      private platform: Platform, 
      private http: Http
    ) {
        this.databaseReady = new BehaviorSubject(false);
        this.platform.ready().then(() => {
            this.sqlite.create({
              name: DATABASE_FILE_NAME,
              location: 'default'
            })
            .then((db: SQLiteObject) => {
              this.db = db;
              this.storage.get('database_filled').then(val => {
                if (val) {
                  this.databaseReady.next(true);
                } else {
                  this.fillDatabase();
                }
              });
            });
          });
  }
 
  fillDatabase() {
    this.http.get('assets/dummyDump.sql')
      .map(res => res.text())
      .subscribe(sql => {
        this.sqlitePorter.importSqlToDb(this.db, sql)
          .then(data => {
            this.databaseReady.next(true);
            this.storage.set('database_filled', true);
          })
          .catch(e => console.error(e));
      });
  }

  addUser(firstname, lastname) {
    let data = [firstname, lastname]
    return this.db.executeSql("INSERT INTO users (firstname, lastname) VALUES (?, ?)", data).then(data => {
      return data;
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }
  
  getAllUsers() {
    return this.db.executeSql("SELECT * FROM users", []).then((data) => {
      let users = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          users.push({ id: data.rows.item(i).id, firstname: data.rows.item(i).firstname, lastname: data.rows.item(i).lastname });
        }
      }
      return users;
    }, err => {
      console.log('Error: ', err);
      return [];
    });
  }
  
  deleteUser(id) {
    return this.db.executeSql('DELETE FROM users WHERE id=?', [id]).then(() => {
      console.log('Deleted user!');
      
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  editUser(firstname, lastname, id) {
    return this.db.executeSql('UPDATE users SET firstname=?,lastname=? WHERE id=?', [firstname, lastname, id]).then(() => {
      console.log('Updated user!');
    }, err => {
      console.log('Error: ', err);
      return err;
    });
  }

  getDatabaseState() {
    return this.databaseReady.asObservable();
  }

}
