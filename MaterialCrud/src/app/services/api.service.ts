import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }

  postProduct(data:any){
    return this.http.post<any>("https://fakestoreapi.com/products/",data)
  }

  getProduct(){
    return this.http.get<any>("https://fakestoreapi.com/products")
  }

  putProduct(data:any,id:number){
    return this.http.put<any>("https://fakestoreapi.com/products/"+id,data)
  }

  deleteProduct(id:number){
    return this.http.delete<any>("https://fakestoreapi.com/products/"+id)
  }
}
