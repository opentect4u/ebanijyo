import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { globalData } from 'src/app/globalVar';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {
  public quantity:number = 1;
  url=globalData.apiUrl
  constructor(public appService:AppService, public snackBar: MatSnackBar,private dataServe:DataService) { }

  ngOnInit() {
    
    // this.appService.Data.cartList.forEach(cartProduct=>{
    //   this.appService.Data.wishList.forEach(product=>{
    //     console.log("ekhane",product)
    //     if(cartProduct.id == product.id){
    //       product.cartCount = cartProduct.cartCount;
    //     }
    //   });
    // });
  }

  public remove(product:Product) {
    const index: number = this.appService.Data.wishList.indexOf(product);
    if (index !== -1) {
        this.appService.Data.wishList.splice(index, 1);
    }
    if(localStorage.getItem('isLoggedIn')=='true')
    var dt={
      prod_dtls:product,
      user_id:localStorage.getItem('userId'),
     }
    this.dataServe.delWishList(dt).subscribe(data=>{console.log(data)})
  
       
  }

  public clear(){
    console.table(this.appService.Data.wishList);
    
    this.appService.Data.wishList.forEach(product=>{
      this.appService.resetProductCartCount(product);
    });
    if(localStorage.getItem('isLoggedIn')=='true')
    var dt={
      prod_dtls:this.appService.Data.wishList,
      user_id:localStorage.getItem('userId'),
     }
    this.dataServe.delWishList(dt).subscribe(data=>{console.log(data)
    this.appService.Data.wishList.length = 0;

     })
  } 

  public getQuantity(val){
    this.quantity = val.soldQuantity;
  }

  public addToCart(product:Product){
    let currentProduct = this.appService.Data.cartList.filter(item=>item.id == product.id)[0];
    if(currentProduct){
      if((currentProduct.cartCount + this.quantity) <= product.availibilityCount){
        product.cartCount = currentProduct.cartCount + this.quantity;
      }
      else{
        this.snackBar.open('You can not add more items than available. In stock ' + product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cartCount = this.quantity;
    }
    this.appService.addToCart(product);
    if(localStorage.getItem('isLoggedIn')=='true'){
      var dt={
        prod_dtls:product,
        user_id:localStorage.getItem('userId'),
        user_email:localStorage.getItem('userEmail')
      }
      this.dataServe.putCart(dt).subscribe(data=>{
        console.log(data)
      })
    }
  } 
  // public addToCart(product:Product){
  
  //   let currentProduct = this.appService.Data.cartList.filter(item=>item.id == product.id)[0];
  //   if(this.appService.Data.cartList.filter(item=>item.id == product.id).length>0)
  //   product.cartCount+=1
  //   else
  //   product.cartCount=1
  //   console.log(product);
    
  //   if(currentProduct){
  //     // console.log(currentProduct)
  //     // if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
  //       if((currentProduct.cartCount + this.count) <= 5){
  //         //need to change
  //       // product.cartCount = currentProduct.cartCount + this.count;
  //       console.log(this.count)
  //     }
  //     else{
  //       this.snackBar.open('You can not add more items than available. In stock ' + this.product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
  //       return false;
  //     }
  //   }
  //   else{
  //     product.cartCount = this.count;
  //   }
  //   this.appService.addToCart(product);
   
  //   // this.addProdToCookie[product.id] = product;
  //   // console.log(this.addProdToCookie)

  // }

}