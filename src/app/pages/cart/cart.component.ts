import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';
import { Data, AppService } from '../../app.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  total = [];
  grandTotal = 0;
  cartItemCount = [];
  cartItemCountTotal = 0;
  constructor(public appService:AppService,private dataServe:DataService) { }
  url=globalData.apiUrl
  ngOnInit() {
    this.appService.Data.cartList.forEach((product:any)=>{
      console.log(product)
      this.total[product.id] = product.cartCount*product.offer_price;
      this.grandTotal += product.cartCount*product.offer_price;
      this.cartItemCount[product.id] = product.cartCount;
      this.cartItemCountTotal += product.cartCount;
      console.log(this.grandTotal)
    })
  }

  public updateCart(value){
    console.log(value)
    if(value){
      this.total[value.productId] = value.total;
      this.cartItemCount[value.productId] = value.soldQuantity;
      this.grandTotal = 0;
      this.total.forEach(price=>{
        this.grandTotal += price;
      });
      this.cartItemCountTotal = 0;
      this.cartItemCount.forEach(count=>{
        this.cartItemCountTotal +=count;
      });
     
      this.appService.Data.totalPrice = this.grandTotal;
      this.appService.Data.totalCartCount = this.cartItemCountTotal;

      this.appService.Data.cartList.forEach(product=>{
        this.cartItemCount.forEach((count,index)=>{
          if(product.id == index){
            product.cartCount = count;
          }
        });
      });
      
    }
  }

  public remove(product) {
    const index: number = this.appService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.appService.Data.cartList.splice(index, 1);
      this.grandTotal = this.grandTotal - this.total[product.id]; 
      this.appService.Data.totalPrice = this.grandTotal;       
      this.total.forEach(val => {
        if(val == this.total[product.id]){
          this.total[product.id] = 0;
        }
      });

      this.cartItemCountTotal = this.cartItemCountTotal - this.cartItemCount[product.id]; 
      this.appService.Data.totalCartCount = this.cartItemCountTotal;
      this.cartItemCount.forEach(val=>{
        if(val == this.cartItemCount[product.id]){
          this.cartItemCount[product.id] = 0;
        }
      });
      this.appService.resetProductCartCount(product);
      if(localStorage.getItem('isLoggedIn')=='true')
      var dt={
        prod_dtls:product,
        user_id:localStorage.getItem('userId'),
       }
      this.dataServe.delCart(dt).subscribe(data=>{console.log(data)})
    
    }     
  }

  public clear(){
    this.appService.Data.cartList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
  
    if(localStorage.getItem('isLoggedIn')=='true')
    var dt={
      prod_dtls:this.appService.Data.cartList,
      user_id:localStorage.getItem('userId'),
     }
    this.dataServe.delCart(dt).subscribe(data=>{console.log(data)
    
    })
     this.appService.Data.cartList.length = 0;
     this.appService.Data.totalPrice = 0;
     this.appService.Data.totalCartCount = 0;
  
  } 

}
