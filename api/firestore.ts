import * as firebase from "firebase";
import 'firebase/firestore';

export class Firestore {
    fsto: firebase.firestore.Firestore;
    constructor() {        
        this.fsto = firebase.firestore();
        const settings = {timestampsInSnapshots: true};
        this.fsto.settings(settings);
    }

    getAll(collection:string,callback: (data:any)=>void):any {
        
        this.fsto.collection(collection).get().then((snapshot) =>callback(snapshot));

      };

    getOrdered(collection:string, orderColumn:string, asc:boolean, limit:number, callback: (data:any)=>void){
        this.fsto.collection(collection).orderBy(orderColumn, asc? "asc":"desc").limit(limit).get().then((snapshot) =>callback(snapshot));
    }
}