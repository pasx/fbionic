import * as firebase from "firebase";
import { Login } from './login';
import { Database } from './database';
import { Firestore } from './firestore';

export class FirebaseApi {
    firebase: any;

    login: Login;
    database: Database;
    firestore: Firestore;

    static _instance : FirebaseApi;

    constructor(config:any){
        FirebaseApi._instance = this;
        this.firebase = firebase;
        firebase.initializeApp(config);
        this.login = new Login();
        this.database = new Database();
        this.firestore = new Firestore();
    }
}
