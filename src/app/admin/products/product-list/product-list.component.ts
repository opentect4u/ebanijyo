import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/app.models';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';
import { UserDialogComponent } from '../../users/user-dialog/user-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  public products:any= [];
  public viewCol: number = 25;
  public page: any;
  public count = 12;
  url=globalData.apiUrl
  viewGrid=true;
  constructor(public appService:AppService, public dialog: MatDialog,private dataServe:DataService) { }

  ngOnInit(): void {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    this.getAllProducts(); 
  }

  // public getAllProducts(){
  //   this.appService.getProducts("featured").subscribe(data=>{
  //     this.products = data; 
  //     //for show more product  
  //     for (var index = 0; index < 3; index++) {
  //       this.products = this.products.concat(this.products);        
  //     }
  //   });
  
  // }
  public getAllProducts(){
      this.dataServe.adminGetProductList(null).subscribe(data=>{
        console.log(data)
        this.products=data;
        this.products=this.products.msg;
      })
  }

  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  @HostListener('window:resize')
  public onWindowResize():void { 
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }
 

  public remove(product:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this product?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.products.indexOf(product);
        if (index !== -1) {
          this.products.splice(index, 1);  
          this.dataServe.adminDelProduct(product.id,product.prod_name).subscribe(data=>{
            console.log(data);
            this.getAllProducts();
          })
        } 
      } 
    }); 
  }
  public openUserDialog(user){
    // let dialogRef = this.dialog.open(UserDialogComponent, {
    //     data: user
    // });

    // dialogRef.afterClosed().subscribe(user => {
    //     // if(user){
    //     //     (user.id) ? this.updateUser(user) : this.addUser(user);
    //     // }
    // });
}
   changeView(view:any){
        if(view=='grid')
          this.viewGrid=true
        else
          this.viewGrid=false;
   }
}
