import * as firebase from "firebase";

export class Database {
    st: any;
    db: any;
    constructor() {
        this.db = firebase.database();        
        this.st = firebase.storage();
    }

    get database(): any {
        return this.db;
    }

    get storage(): any {
        return this.st;
    }

    checkConnected():boolean {
        var connectedRef = this.db.ref(".info/connected");
        connectedRef.on("value", function (snap) {
            if (snap.val() === true) {
                //alert("connected");
                return true;
            } else {
                //alert("not connected");
            }
        });
        return false;
    }

    loadLast(ref:string,callback: (data:any)=>void,limit:number):any {
        // Reference to the /messages/ database path.
        var dataRef = this.db.ref(ref);
        // Make sure we remove all previous listeners.
        dataRef.off();
        var setData = callback;//callback.bind(this);
        dataRef.limitToLast(limit).on('child_added', setData);
        dataRef.limitToLast(limit).on('child_changed', setData);
        return dataRef;
      };
}