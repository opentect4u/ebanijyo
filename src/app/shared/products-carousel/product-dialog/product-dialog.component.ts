import { Component, ViewEncapsulation, OnInit, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from '../../../app.models';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';

@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ProductDialogComponent implements OnInit {
  public config: SwiperConfigInterface = {};
  public prod:any=[];
  public prodCol:any=[];
  url=globalData.apiUrl
  phone="9674147178"

  constructor(public appService:AppService, 
              public dialogRef: MatDialogRef<ProductDialogComponent>,
              private dataServe:DataService,
              @Inject(MAT_DIALOG_DATA) public product: Product) { }

  ngOnInit() {
   this.getProductById(this.product.id)

   }
   
   public getProductById(id:any){
    this.dataServe.adminGetProductList(id).subscribe(data=>{
      console.log(data)
      this.prod=data;
      this.prodCol=data;
      this.prod=this.prod.msg[0];
      this.prodCol=this.prodCol.msg[1];
      this.config = {
        
          slidesPerView: 1,
          spaceBetween: 0,         
          keyboard: true,
          navigation: true,
          grabCursor: true,        
          loop: false,
          preloadImages: false,
          lazy: true, 
          autoplay: {delay: 3000,disableOnInteraction: false},
          speed: 500,
          effect: "slide"
        
      }
    })
  }

  // ngAfterViewInit(){
  //   this.config = {
  //     slidesPerView: 1,
  //     spaceBetween: 0,         
  //     keyboard: true,
  //     navigation: true,
  //     pagination: false,
  //     grabCursor: true,        
  //     loop: false,
  //     preloadImages: false,
  //     lazy: true, 
  //     effect: "fade",
  //     fadeEffect: {
  //       crossFade: true
  //     }
  //   }
  // }
  
  public close(): void {
    this.dialogRef.close();
  }
}