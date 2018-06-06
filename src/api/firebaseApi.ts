import * as firebase from "firebase";
import { Login } from './login';
import { Database } from './database';

export class FirebaseApi {
    //firebase
    firebase: any;
    //Login
    login: Login;
    //Database
    database: Database;
    //FirebaseApi
    static _instance : FirebaseApi;

    constructor(config:any){
        FirebaseApi._instance = this;
        this.firebase = firebase;
        firebase.initializeApp(config);
        //login
        this.login = new Login();
        this.database = new Database();
        // this.storage = firebase.storage();
    }
}
