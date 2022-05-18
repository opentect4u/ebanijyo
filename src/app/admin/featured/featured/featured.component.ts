import { Component, OnInit, HostListener } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Product } from 'src/app/app.models';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';
import { UserDialogComponent } from '../../users/user-dialog/user-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-featured',
  templateUrl: './featured.component.html',
  styleUrls: ['./featured.component.scss']
})

export class FeaturedComponent implements OnInit {
  featuredId:any;
  checked = false;
  public products:any= [];
  checkFeatured:any=[];
  public viewCol: number = 25;
  public page: any;
  public count = 12;
  url=globalData.apiUrl
  viewGrid=true;
  prodId:any;
  checkboxes: any=[];
  featuredData:any;
  user="admin@gmail.com"
  carousalData=[
    {id:1,name:"Featured"},
    {id:2,name:"On Sale"},
    {id:3,name:"Top Rated"},
    {id:4,name:"New Arrival"}
  ]
  selectedId:any;
  constructor(public appService:AppService, private _snackbar:MatSnackBar, public dialog: MatDialog,private dataServe:DataService) { }

  ngOnInit(): void {
    if(window.innerWidth < 1280){
      this.viewCol = 33.3;
    };
    // this.getAllProducts(); 
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
  public getAllProducts(type:any){
      this.dataServe.getFeatured(type).subscribe(data=>{
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
            // this.getAllProducts();
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
   carousalDtls(e:any){
     this.selectedId=e.value;
     console.log(this.selectedId)
     this.getAllProducts(this.selectedId)
   }
   addtoFeatured(event:any){
    //  console.log(event);
     this.checkFeatured.length=0;
     this.checkboxes = document.getElementsByName('chkVal');
       for (var i = 0; i < this.checkboxes.length; i++) {
         if (this.checkboxes[i].checked === true) {
           if(this.checkFeatured.length >= 6){
           this.checkboxes[i].checked=false
            this.openSnackBar("You can choose only upto six items","Close")
           
             break;
           
           }else{
            this.checkFeatured.push({ id: this.checkboxes[i].value });
           }
         }
       }

   }
   addtoOnSale(event:any){
    //  console.log(event);
     this.checkFeatured.length=0;
     this.checkboxes = document.getElementsByName('chkVal');
       for (var i = 0; i < this.checkboxes.length; i++) {
         if (this.checkboxes[i].checked === true) {
           if(this.checkFeatured.length >= 6){
           this.checkboxes[i].checked=false
            this.openSnackBar("You can choose only upto six items","Close")
           
             break;
           
           }else{
            this.checkFeatured.push({ id: this.checkboxes[i].value });
           }
         }
       }

   }
   addtoTopRated(event:any){
    //  console.log(event);
     this.checkFeatured.length=0;
     this.checkboxes = document.getElementsByName('chkVal');
       for (var i = 0; i < this.checkboxes.length; i++) {
         if (this.checkboxes[i].checked === true) {
           if(this.checkFeatured.length >= 6){
           this.checkboxes[i].checked=false
            this.openSnackBar("You can choose only upto six items","Close")
           
             break;
           
           }else{
            this.checkFeatured.push({ id: this.checkboxes[i].value });
           }
         }
       }

   }
   addtoNewArrival(event:any){
    //  console.log(event);
     this.checkFeatured.length=0;
     this.checkboxes = document.getElementsByName('chkVal');
       for (var i = 0; i < this.checkboxes.length; i++) {
         if (this.checkboxes[i].checked === true) {
           if(this.checkFeatured.length >= 6){
           this.checkboxes[i].checked=false
            this.openSnackBar("You can choose only upto six items","Close")
           
             break;
           
           }else{
            this.checkFeatured.push({ id: this.checkboxes[i].value });
           }
         }
       }

   }

submitFeatured(type){
  console.log(this.checkFeatured);
  var dt={
    "product_id":this.checkFeatured,
    "type":type,
    "user":this.user
  }
  this.dataServe.addFeatured(dt).subscribe(data=>{console.log(data)
   this.featuredData=data;
   this.openSnackBar(this.featuredData.msg,"Close")
   
  })
  
    // for(let i=0;i<this.products.length;i++){
    //   // alert("puch")
    //   this.prodId=document.getElementById('feat'+this.products[i].id);
    //   console.log(this.prodId.checked)
    //   if(this.prodId.checked)
    //   { 
        
    //    this.checkFeatured.push(this.products[i].id);
           
    //   }
    // }
    // console.log(this.checkFeatured)
}


openSnackBar(message: string, action: string) {
  this._snackbar.open(message, action);

  setTimeout(() => {
    this._snackbar.dismiss();
    // this.router.navigate(['/admin/products/product-list'])
   
  }, 2500)
}
}
