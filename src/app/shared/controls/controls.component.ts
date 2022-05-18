import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Data, AppService } from '../../app.service';
import { Product } from '../../app.models';
import { CookieService } from 'ngx-cookie-service';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ControlsDialogComponent } from './controls-dialog/controls-dialog.component';

@Component({
  selector: 'app-controls',
  templateUrl: './controls.component.html',
  styleUrls: ['./controls.component.scss']
})
export class ControlsComponent implements OnInit {
  @Input() product: any;
  @Input() type: string;
  @Output() onOpenProductDialog: EventEmitter<any> = new EventEmitter();
  @Output() onQuantityChange: EventEmitter<any> = new EventEmitter<any>();
  public count:number = 1;
  public align = 'center center';
  addProd:any=[];
  countCart=0
  totPrice=0
  wishlist:any;
  isSelect=false
  constructor(private dialog:MatDialog, private dataServe:DataService, private cookieService:CookieService, public appService:AppService, public snackBar: MatSnackBar) {
    // console.log(localStorage.getItem('isLoggedIn'))
    // if('isLoggedIn' in localStorage){
    //   console.log(JSON.parse(atob(this.cookieService.get('cartList'))))
    //   this.appService.Data.cartList.push(JSON.parse(atob(this.cookieService.get('cartList'))))
    //   this.appService.Data.totalCartCount=this.appService.Data.cartList.length
    // }
    // else{
    //   this.cookieService.deleteAll()
    // }
   }

  ngOnInit() {
    if(this.product){
      if(this.product.cartCount > 0){
       
        this.count = this.product.cartCount;
        
      }
    }  
    this.layoutAlign(); 
    if(localStorage.getItem('isLoggedIn')=='true')
    this.dataServe.getCart(localStorage.getItem('userId')).subscribe(data=>{
      console.log(data)
      this.addProd=data
      this.appService.Data.cartList=this.addProd.msg;
      for(let i=0;i<this.addProd.msg.length;i++){
        this.countCart+=this.addProd.msg[i].cartCount
        this.totPrice+=this.addProd.msg[i].offer_price*this.addProd.msg[i].cartCount
      }
      this.appService.Data.totalCartCount=this.countCart;
      this.appService.Data.totalPrice=this.totPrice
      // this.appService.Data.totalPrice=this.countCart
    })
    this.dataServe.getWishList(localStorage.getItem('userId')).subscribe(data=>{
      console.log(data)
      this.appService.Data.wishList.length = 0
      this.wishlist=data;
      this.appService.Data.wishList=this.wishlist.msg;

    })
   

  }

  public layoutAlign(){
    if(this.type == 'all'){
      this.align = 'space-between center';
    }
    else if(this.type == 'wish'){
      this.align = 'start center';
    }
    else{
      this.align = 'center center';
    }
  }



  public increment(count){
    if(this.count < 5){
      this.count++;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.offer_price
      }
      this.changeQuantity(obj);
    }
    else{
      this.snackBar.open('You can not choose more items than available. In stock ' + this.count + ' items.', '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });
    }    
  }

  public decrement(count){
    if(this.count > 1){
      this.count--;
      let obj = {
        productId: this.product.id,
        soldQuantity: this.count,
        total: this.count * this.product.offer_price
      }
      this.changeQuantity(obj);
    }
  }

  public addToCompare(product:Product){
    this.appService.addToCompare(product);
  }

  public addToWishList(product:any){
    console.log(product);
    this.isSelect=true;
    if(localStorage.getItem('isLoggedIn')=='true'){
    this.appService.addToWishList(product);

      var dt={
        prod_dtls:product,
        user_id:localStorage.getItem('userId'),
        user_email:localStorage.getItem('userEmail')
      }
      this.dataServe.putWishList(dt).subscribe(data=>{
        console.log(data)
      })
    }
    else{
       this.dialog.open(ControlsDialogComponent)
    }
  }

  public addToCart(product:Product){
  
    let currentProduct = this.appService.Data.cartList.filter(item=>item.id == product.id)[0];
    if(this.appService.Data.cartList.filter(item=>item.id == product.id).length>0)
    product.cartCount+=1
    else
    product.cartCount=1
    console.log(product);
    
    if(currentProduct){
      // console.log(currentProduct)
      // if((currentProduct.cartCount + this.count) <= this.product.availibilityCount){
        if((currentProduct.cartCount + this.count) <= 5){
          //needs to be changed
          //need to change
        // product.cartCount = currentProduct.cartCount + this.count;
        console.log(this.count)
      }
      else{
        this.snackBar.open('You can not add more items than available. In stock ' + this.product.availibilityCount + ' items and you already added ' + currentProduct.cartCount + ' item to your cart', '×', { panelClass: 'error', verticalPosition: 'top', duration: 5000 });
        return false;
      }
    }
    else{
      product.cartCount = this.count;
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
    // this.addProdToCookie[product.id] = product;
    // console.log(this.addProdToCookie)

  }

  public openProductDialog(event){
    this.onOpenProductDialog.emit(event);
  }

  public changeQuantity(value){
      this.onQuantityChange.emit(value);
  }

}