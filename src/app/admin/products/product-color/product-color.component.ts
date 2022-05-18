import { Component, OnInit } from '@angular/core';
import { adminCategory, Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
// import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { ColorDialogComponent } from './color-dialog/color-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AppSettings, Settings } from 'src/app/app.settings';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-product-color',
  templateUrl: './product-color.component.html',
  styleUrls: ['./product-color.component.scss']
})
export class ProductColorComponent implements OnInit {
  public categories:Category[] = []; 
  public adminColors:any=[];
  public page: any;
  public count = 6;
  public settings:Settings;
  constructor(public appService: AppService, public dialog: MatDialog, public appSettings:AppSettings,private dataServe:DataService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getColors();
  }

  public getColors(){   
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetColors().subscribe(data=>{
      this.adminColors=data
      this.adminColors=this.adminColors.msg
      console.log(this.adminColors)
    })
  }


  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public openColorDialog(data:any){
    const dialogRef = this.dialog.open(ColorDialogComponent, {
      data: {
        color: data,
        colors: this.adminColors
      },
      panelClass: ['theme-dialog'],
      autoFocus: true,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(color => { 
      if(color){    
        const index: number = this.adminColors.findIndex(x => x.id == color.id);
        if(index !== -1){
          this.adminColors[index] = color;
        } 
        else{ 
          let last_color = this.adminColors[this.adminColors.length - 1]; 
          color.id = last_color.id + 1;
          this.adminColors.push(color);  
        }          
      }
    });
  }

  public remove(color:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this color?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.adminColors.indexOf(color);
        if (index !== -1) {
          this.dataServe.adminDeleteColors(color).subscribe(data=>{
            console.log(data)
          })
          this.adminColors.splice(index, 1);  
        } 
      } 
    }); 
  }


}
