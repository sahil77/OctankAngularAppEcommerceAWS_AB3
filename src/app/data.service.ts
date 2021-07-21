import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //private REST_API_SERVER = "http://localhost:3000/products";
  private REST_API_SERVER = "https://hdwc8tgwh1.execute-api.ap-south-1.amazonaws.com/dev/products";

  constructor(private httpClient: HttpClient) { }

    public sendGetRequest(){
    // let headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   'Access-Control-Allow-Origin': '*' });
    // let options = { headers: headers };
    //return this.httpClient.get(this.REST_API_SERVER,options);
    return this.httpClient.get(this.REST_API_SERVER);

  }

    public buyProduct(orderObject:any, jwtAccessToken:string){

      const apiToken:string = jwtAccessToken;

      const headers = { 'Authorization': apiToken, 'content-type': 'application/json' };
      const body = { title: 'Angular POST Request Example' };
      //this.httpClient.put<any>(this.REST_API_SERVER, body, { headers });
      return this.httpClient.put<any>(this.REST_API_SERVER, orderObject, {headers});

    }
}
