import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components'; 
import Amplify, { Auth } from 'aws-amplify';
import { Router } from '@angular/router';
// import amplify from '/aws-exports';

// Amplify.configure(amplify);
// Auth.configure(amplify);

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Octank\'s Ecommerce Website';
  isSignedIn!:boolean;
  userName!:string;
  constructor(private router:Router){}

  ngOnInit(){
    //this.isSignedIn = false;
    this.getUserInfo();
      }

  async getUserInfo(){
    try {
      //const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
      const userName = (await Auth.currentSession()).getAccessToken().payload.username;
      const isSignedIn = (await Auth.currentUserCredentials()).authenticated;
      this.userName = userName;
      this.isSignedIn = isSignedIn;
      console.log('Here are the current session info! =>d', userName);     
    } catch (err) {
      console.log('Current user info failed to fetch', err);
      return err;
    }
  } 

  public signOut(){
   Auth.signOut();
   //window.location.href="/login";
   //this.router.navigateByUrl('/login');
   //this.ngOnInit();
  }

  
}

