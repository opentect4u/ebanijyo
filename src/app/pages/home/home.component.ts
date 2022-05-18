import { Component, OnInit } from '@angular/core';
import { AppService } from '../../app.service';
import { Product } from "../../app.models";
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public slides = [
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner1.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner2.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner3.jpg' },
    { title: 'Summer collection', subtitle: 'New Arrivals On Sale', image: 'assets/images/carousel/banner4.jpg' },
    { title: 'The biggest sale', subtitle: 'Special for today', image: 'assets/images/carousel/banner5.jpg' }
  ];

  public brands = [];
  public banners = [];
  public featuredProducts:any;
  public onSaleProducts: any
  public topRatedProducts: any
  public newArrivalsProducts: any


  constructor(public appService:AppService,private dataServe:DataService) { }

  ngOnInit() {
    this.getBanners();
    this.getProducts(1);
    this.getBrands();
  }

  public onLinkClick(e){
    console.log(e)
    this.getProducts(Number(e.index)+1); 
  }

  public getProducts(type){
    if(type == 1 && !this.featuredProducts){
      this.dataServe.getCarousalByLabel(type).subscribe(data=>{
        this.featuredProducts = data;      
        this.featuredProducts = this.featuredProducts.msg;     
         console.log(this.featuredProducts)

      }) 
    }
    if(type == 2 && !this.onSaleProducts){
      this.dataServe.getCarousalByLabel(type).subscribe(data=>{
        this.onSaleProducts = data;      
        this.onSaleProducts = this.onSaleProducts.msg;      
      })
    }
    if(type == 3 && !this.topRatedProducts){
      this.dataServe.getCarousalByLabel(type).subscribe(data=>{
        this.topRatedProducts = data;      
        this.topRatedProducts = this.topRatedProducts.msg;      
      })
    }
    if(type == 4 && !this.newArrivalsProducts){
      this.dataServe.getCarousalByLabel(type).subscribe(data=>{
        this.newArrivalsProducts = data;      
        this.newArrivalsProducts =  this.newArrivalsProducts.msg;      
      })
    }
   
  }

  public getBanners(){
    this.appService.getBanners().subscribe(data=>{
      this.banners = data;
    })
  }

  public getBrands(){
    this.brands = this.appService.getBrands();
  }

}
