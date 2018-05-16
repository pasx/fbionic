import * as firebase from "firebase";
import { Login } from './login';

export class FirebaseApi {
    //firebase
    firebase: any;
    //Login
    login: Login;
    //FirebaseApi
    static _instance : FirebaseApi;

    constructor(config:any){
        FirebaseApi._instance = this;
        this.firebase = firebase;
        firebase.initializeApp(config);
        //login
        this.login = new Login();
        // this.database = firebase.database();
        // this.storage = firebase.storage();
    }
}

