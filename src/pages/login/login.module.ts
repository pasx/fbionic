import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginPage } from './login';

@NgModule({
  declarations: [
    LoginPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginPage),
  ],
})
export class LoginPageModule {

	constructor(){
	
		//add login code here
		//cf.:https://scotch.io/tutorials/build-an-ionic-app-with-user-authentication
	
	}

}
