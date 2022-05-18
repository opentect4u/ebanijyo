import { Component, OnInit, ViewChild } from '@angular/core';
import { MatAccordion } from '@angular/material/expansion';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { MatDialog } from '@angular/material/dialog';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';
interface Food {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-user-banner',
  templateUrl: './user-banner.component.html',
  styleUrls: ['./user-banner.component.scss']
})
export class UserBannerComponent implements OnInit {
  bannerFormGroup: FormGroup;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @ViewChild('stepper') stepper;

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];
  constructor(public dialog: MatDialog,private _formBuilder: FormBuilder, private dataServe:DataService) { }
  public page: any;
  public count = 6;
  public limit:any;
  panelOpenState = true;
  bannerImg=null;
  expandPanel:any;
  user='admin@gmail.com'
  bannerData:any;
  paramData:any;
  id:any;
  imgPath:any;
  url=globalData.apiUrl
  hideCard=true;
  imgPre:any;
  title='Banner';
  selId=1
  isEdit=false
  
  ngOnInit(): void {
    this.bannerFormGroup = this._formBuilder.group({
      heading: ['', Validators.required],
      subheading: ['', Validators.required],
      pg_url: ['', Validators.required],
      img: ['']
    });
    this.getBanners(1);
    this.getParams()
  }
  upload(e:any){
    console.log(e.target.files)
    this.bannerImg=e.target.files[0];
    this.imgPre = document.getElementById('imgPre')
    this.imgPre.src = URL.createObjectURL(this.bannerImg);
    this.imgPath = URL.createObjectURL(this.bannerImg);
    console.log(this.imgPath);
    
    this.hideCard=false;
  }
  submitBanner() {
   
    var dt = {
      id:this.id>0?this.id:0,
      file:this.bannerImg,
      param_id:this.selId,
      param_name:this.title,
      heading: this.bannerFormGroup.value.heading,
      sub_heading: this.bannerFormGroup.value.subheading,
      page_url:this.bannerFormGroup.value.pg_url,
      user:this.user
    }
    this.dataServe.adminPostBanner(dt).subscribe(data=>{
      console.log(data)
    this.getBanners(dt.param_id)
    this.panelOpenState=false;
    this.bannerFormGroup.reset();
    this.hideCard=true;
    this.id=0
    if(this.isEdit){this.isEdit=false}
    })
  }
  getBanners(id:any){
    this.dataServe.adminGetBanner(id,0).subscribe(data=>{
      console.log(data);
      this.bannerData=data;
      this.bannerData=this.bannerData.msg
    })
  }
  getParams(){
    this.dataServe.adminGetParams().subscribe(data=>{
      console.log(data);
      this.paramData=data
      this.paramData=this.paramData.msg
    })
  }
  bannerdtls(e:any){
    console.log(e.value+" "+e.source.triggerValue)
    // console.log(e)
    this.title=e.source.triggerValue
    this.selId=e.value.slice('/')[0];
    this.limit=e.value.slice('/')[2];
    console.log(this.limit)
    this.getBanners(this.selId);
    this.panelOpenState=true
    this.bannerFormGroup.reset();
    this.hideCard=true
    this.isEdit=false
  }
  edit(banner:any){
    this.isEdit=true
    this.panelOpenState=true
    this.hideCard=false;
    this.id=banner.id;
    this.imgPath=banner.img_path
    this.bannerFormGroup.patchValue({
      heading:banner.heading,
      pg_url:banner.page_url,
      subheading:banner.sub_heading,
    })
    
  }
  resetForm(){
    this.bannerFormGroup.reset();
  }
  remove(banner:any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want delete this "+this.title+"?"
      }
    }); 
    var dt={
      id:banner.id,
      img_path:banner.img_path
    }
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        // const index: number = this.products.indexOf(product);
        // if (index !== -1) {
          // this.products.splice(index, 1);  
          this.dataServe.bannerDel(dt).subscribe(data=>{
            console.log(data);
            this.getBanners(this.selId);
          })
        // } 
      } 
    })
    // this.dataServe.bannerDel(dt).subscribe(data=>{
    //   console.log(data);
    //   this.getBanners(dt.id);
    // })
  }
}
