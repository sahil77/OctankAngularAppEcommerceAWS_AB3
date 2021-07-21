import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components'; 

import { Router } from '@angular/router';

import { Injectable } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class LoginComponent implements OnInit {

  title = 'Amplify-Auth-Project';

  user:CognitoUserInterface | undefined;
  authState!: AuthState;
  jwtAccessToken!: string;

  constructor(private ref:ChangeDetectorRef, private router:Router){
    
  }

  ngOnInit(){
    onAuthUIStateChange((authState, authData) => {
      this.authState = authState;
      this.user = authData as CognitoUserInterface;
      this.jwtAccessToken = this.user.signInUserSession.idToken.jwtToken;
      this.ref.detectChanges();
      //alert('Hi');
      this.redirectToHome();
    })
   
    
  }

  public redirectToHome() {
    //this.router.navigateByUrl('/home');
    window.location.href="/home";
  }

  ngOnDestroy(){
    return onAuthUIStateChange;
  }

  
}
