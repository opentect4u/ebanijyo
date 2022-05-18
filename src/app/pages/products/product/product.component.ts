import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SwiperConfigInterface, SwiperDirective } from 'ngx-swiper-wrapper';
import { Data, AppService } from '../../../app.service';
import { Product } from "../../../app.models";
import { emailValidator } from '../../../theme/utils/app-validators';
import { ProductZoomComponent } from './product-zoom/product-zoom.component';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';
// import { NgxImgZoomService } from "ngx-img-zoom";
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @ViewChild('zoomViewer', { static: true }) zoomViewer;
  @ViewChild(SwiperDirective, { static: true }) directiveRef: SwiperDirective;
  public config: SwiperConfigInterface={};
  public product:any=[];
  prodCol:any=[];
  public image: any;
  public zoomImage: any;
  private sub: any;
  public form: FormGroup;
  public relatedProducts:any;
  url=globalData.apiUrl;
  phone="9674147178"
  lgImg:any;
  imagePath: any;
  previewImageSrc: any;
  zoomImageSrc:any;
  currentRoute:any
  constructor(private router:Router, public dataServe:DataService, public appService:AppService, private activatedRoute: ActivatedRoute, public dialog: MatDialog, public formBuilder: FormBuilder) {

   
    }

  ngOnInit() {      
    this.sub = this.activatedRoute.params.subscribe(params => { 
      this.getProductById(params['id']); 
    }); 
    this.currentRoute=this.router.url
    this.form = this.formBuilder.group({ 
      'review': [null, Validators.required],            
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'email': [null, Validators.compose([Validators.required, emailValidator])]
    }); 
    // this.getRelatedProducts();    
  }

  ngAfterViewInit(){
    this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: true,
      navigation: true,
      grabCursor: true,        
      loop: false,
      preloadImages: false,
      lazy: true, 
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      speed: 500,
      effect: "slide"
    }
  }

  public getProductById(id:any){
    this.dataServe.adminGetProductList(id).subscribe(data=>{
      console.log(data)
      this.product=data;
      this.prodCol=data;
      this.product=this.product.msg[0];
      this.lgImg=this.product.img_path
      this.prodCol=this.prodCol.msg[1];
      this.selectImage(this.prodCol.img[0])
      this.getRelatedProducts(this.product.id,this.product.cat_id)

      this.config = {
        slidesPerView: 1,
        spaceBetween: 0,         
        keyboard: true,
        navigation: true,
        grabCursor: true,        
        loop: false,
        preloadImages: false,
        lazy: true, 
        autoplay: {
          delay: 3000,
          disableOnInteraction: false
        },
        speed: 500,
        effect: "slide"
      }
    })
      // this.getRelatedProducts(this.product.cat_id)
  }
 
  public getRelatedProducts(id:any,cat_id:any){
    this.dataServe.adminRelatedProductList(id,cat_id,3).subscribe(data => {
      console.log(data)
      this.relatedProducts = data;
      this.relatedProducts=this.relatedProducts.msg
      // this.relatedProducts.splice(3);
      console.log(this.relatedProducts)
    })
  }

  public selectImage(image){
    // this.image = image.medium;
    // this.zoomImage = image.big;
    this.zoomImage = image.img_path;
    this.lgImg=image.img_path
  }

  public onMouseMove(e){
    console.log(e)
    if(window.innerWidth >= 1280){
      var image, offsetX, offsetY, x, y, zoomer;
      image = e.currentTarget; 
      offsetX = e.offsetX;
      offsetY = e.offsetY;
      x = offsetX/image.offsetWidth*100;
      y = offsetY/image.offsetHeight*100;
      zoomer = this.zoomViewer.nativeElement.children[0];
      console.log(zoomer)
      if(zoomer){
        zoomer.style.backgroundPosition = x + '% ' + y + '%';
        zoomer.style.display = "block";
        zoomer.style.height = image.height + 'px';
        zoomer.style.width = image.width + 'px';
      }
    }
  }

  public onMouseLeave(event){
    this.zoomViewer.nativeElement.children[0].style.display = "none";
  }

  public openZoomViewer(){
    this.dialog.open(ProductZoomComponent, {
      data: this.zoomImage,
      panelClass: 'zoom-dialog'
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  } 

  public onSubmit(values:Object):void {
    if (this.form.valid) {
      //email sent
    }
  }
  preview(files) {
    if (files.length === 0) return;
 
    var mimeType = files[0].type;
    
    var reader = new FileReader();
    this.imagePath = files;
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      //this.imgURL = reader.result;
      this.previewImageSrc = reader.result;
      this.zoomImageSrc = reader.result;
    };
  }
}