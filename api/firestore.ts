import * as firebase from "firebase";

export class Firestore {
    fsto: firebase.firestore.Firestore;
    constructor() {        
        this.fsto = firebase.firestore();
    }

    getAll(collection:string,callback: (data:any)=>void,limit:number):any {
        
        this.fsto.collection(collection).get().then((snapshot) =>callback(snapshot));
        //  {
        //     callback(snapshot)
        //     snapshot.forEach((doc) => {
        //         console.log(`${doc.id} => ${doc.data()}`);
        //     });
        // });

      };
}