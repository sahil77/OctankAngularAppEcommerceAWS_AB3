import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { onAuthUIStateChange, CognitoUserInterface, AuthState } from '@aws-amplify/ui-components'; 

import { Router } from '@angular/router';
import { DataService } from '../data.service';

import { Auth } from 'aws-amplify'; 



@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})

export class HomePageComponent implements OnInit {
  msg1:string;
  selectedProductId: number;
  products: any;
  authObject: any;
  idToken!: any;
  isSignedIn: boolean;

  // user:CognitoUserInterface | undefined;
  // authState!: AuthState;
  // jwtAccessToken!: string;

  constructor(private dataService: DataService, private ref:ChangeDetectorRef, private router:Router){
    this.msg1 = "";
    this.selectedProductId =0;
    this.isSignedIn = false;
  }

  ngOnInit(){
    this.getUserInfo();

    this.dataService.sendGetRequest().subscribe((data:any)=>{
      console.log(data);
      this.products = data['Items'];
      //this.products = data;
    })
  }

  
  async getUserInfo(){
    try {
      const idToken = (await Auth.currentSession()).getIdToken().getJwtToken();
      //const isSignedIn = (await Auth.currentUserCredentials()).authenticated;
      const isSignedIn = (await Auth.currentUserCredentials()).authenticated;
      this.idToken = idToken;
      this.isSignedIn = isSignedIn;
      console.log('Here are the current user info! =>', idToken);     
    } catch (err) {
      console.log('Current user info failed to fetch', err);
      return err;
    }
  } 

  buyProduct(productId:number){

    const orderID:number = this.randomInteger(1,100000000);

    console.log("Order ID is:", orderID);
    //Building the request object 
    const orderObject = {
      payload: {
        TableName: "Orders",
        Item: {
          order_id: orderID,
          product_id: productId,
          order_time: Date.now()
        }
      }
    }

    this.selectedProductId = productId;

    //Calling the API
    this.dataService.buyProduct(orderObject,this.idToken).subscribe((data:any)=>{
      console.log(data);
      this.msg1 = "Order Placed Successfully!";
      return this.msg1;
      //this.products = data['Items'];
      //this.products = data;
    })  

    // this.msg1 = "Order Placed Successfully!";
    // return this.msg1;
    //test code
    //this.msg1 = productId;
    //return this.msg1;
  }


  randomInteger(min:number, max:number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}


