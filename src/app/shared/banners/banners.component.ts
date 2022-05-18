import { Component, OnInit, Input } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.scss']
})
export class BannersComponent implements OnInit {
  @Input('banners') banners: Array<any> = [];
  imgUrl=globalData.apiUrl
  constructor(private dataServe:DataService) { }
  bannerData:any;
  bannerImg:any=[];
  ngOnInit() {
    this.dataServe.adminGetBanner(2,1).subscribe(data=>{console.log(data)
      this.bannerData=data;
      this.bannerData=this.bannerData.msg
       for(let i=0;i<this.bannerData.length;i++){
        this.bannerImg[i]=this.imgUrl+this.bannerData[i].img_path
        console.log(this.bannerImg[i])
        
      }
      console.log(this.bannerData[0].page_url.split('https://ebanijya.opentech4u.co.in').join(''))
      console.log(this.bannerImg[0])
      // console.log(this.imgUrl+this.bannerData[0].img_path);
      })
  // this.getBanners();
   }
  
  getBanners(){
    this.dataServe.adminGetBanner(2,1).subscribe(data=>{console.log(data)
      this.bannerData=data;
      this.bannerData=this.bannerData.msg
      
      })
      console.log(this.bannerData)
      // for(let i=0;i<this.bannerData.length;i++){
      //   this.bannerImg[i]=this.imgUrl+this.bannerData[i].img_path
      //   console.log(this.bannerImg[i])
      // }
      // console.log(this.bannerImg)
      // console.log(this.imgUrl+this.bannerData[0].img_path);
      
  }
  getImg(i:any){
    // alert(this.imgUrl+this.bannerData[i].img_path)
    return this.imgUrl+this.bannerData[i].img_path
  }
  // public getBanner(index){
  //   return this.banners[index];
  // }

  // public getBgImage(index){
  //   let bgImage = {
  //     'background-image': index != null ? "url(" + this.banners[index].image + ")" : "url(https://via.placeholder.com/600x400/ff0000/fff/)"
  //   };
  //   return bgImage;
  // } 

}
