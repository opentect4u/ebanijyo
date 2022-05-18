import { Component, OnInit, Input } from '@angular/core';
import { SwiperConfigInterface, SwiperPaginationInterface } from 'ngx-swiper-wrapper';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';

@Component({
  selector: 'app-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.scss']
})
export class MainCarouselComponent implements OnInit {
  @Input('slides') slides: Array<any> = [];
  imgurl=globalData.apiUrl
  bannerData:any=[];
 
  public config: SwiperConfigInterface = {};

  private pagination: SwiperPaginationInterface = {
    el: '.swiper-pagination',
    clickable: true
  };
  triggerCycle: any;
  
  constructor(private dataServe:DataService) { }

  ngOnInit() {
    // window.addEventListener('scroll', this.triggerCycle.bind(this), true);
    this.getBanners()
   }

  ngAfterViewInit(){
    // this.config = {
    //   slidesPerView: 1,
    //   spaceBetween: 0,         
    //   keyboard: true,
    //   navigation: true,
    //   pagination: this.pagination,
    //   grabCursor: true,        
    //   loop: false,
    //   preloadImages: false,
    //   lazy: true, 
    //   autoplay: {
    //     delay: 6000,
    //     disableOnInteraction: false
    //   },
    //   speed: 500,
    //   effect: "slide"
    // }
  }
  getBanners(){
    this.dataServe.adminGetBanner(1,1).subscribe(data=>{
      this.bannerData=data
      this.bannerData=this.bannerData.msg
      console.log(data);
    if(this.bannerData.length){
       this.config = {
      slidesPerView: 1,
      spaceBetween: 0,         
      keyboard: true,
      navigation: true,
      pagination: this.pagination,
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
  }
    })
  }
}