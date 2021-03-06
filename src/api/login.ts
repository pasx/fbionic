import * as firebase from "firebase";

export class Login {
    auth_: firebase.auth.Auth;
    auth: any;
    private _onAuthStateChangedCallback: any;
    constructor() {
        this.auth = firebase.auth;
        this.auth_ = firebase.auth();
    }

    public signIn() {
        // Sign in Firebase using popup auth and Google as the identity provider.
        var provider = new this.auth.GoogleAuthProvider();
        this.auth_.signInWithPopup(provider);        
        // Initiates Firebase auth and listen to auth state changes.
        this.auth_.onAuthStateChanged(this.onAuthStateChanged.bind(this));
    };

    public signOut = function () {
        // Sign out of Firebase.
        this.auth_.signOut();
    };

    set onAuthStateChangedCallback (callback:any) {
        this._onAuthStateChangedCallback = callback;
    };

    public onAuthStateChanged(user){
        if(!this._onAuthStateChangedCallback) return; //no callback was set
        this._onAuthStateChangedCallback(user);
    }
}

