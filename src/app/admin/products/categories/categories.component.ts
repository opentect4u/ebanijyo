import { Component, OnInit } from '@angular/core';
import { adminCategory, Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AppSettings, Settings } from 'src/app/app.settings';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent implements OnInit {
  public categories:Category[] = []; 
  public adminCategories:any=[];
  public page: any;
  public count = 6;
  public settings:Settings;
  constructor(public appService: AppService, public dialog: MatDialog, public appSettings:AppSettings,private dataServe:DataService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getCategories();
  }

  public getCategories(){   
     //for fetching admin categories
    this.dataServe.adminGetCategories().subscribe(data=>{
      this.adminCategories=data
      this.adminCategories=this.adminCategories.msg
      console.log(this.adminCategories)
    })
  }


  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public openCategoryDialog(data:any){
    console.log(data)
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      data: {
        category: data,
        categories: this.adminCategories
      },
      panelClass: ['theme-dialog'],
      autoFocus: true,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(category => { 
      if(category){    
        const index: number = this.adminCategories.findIndex(x => x.id == category.id);
        if(index !== -1){
          this.adminCategories[index] = category;
        } 
        else{ 
          let last_category = this.adminCategories[this.adminCategories.length - 1]; 
          category.id = last_category.id + 1;
          this.adminCategories.push(category);  
        }          
      }
    });
  }

  public remove(category:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this category?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.adminCategories.indexOf(category);
        if (index !== -1) {
          this.dataServe.adminDeleteCategories(category).subscribe(data=>{
            console.log(data)
          })
          this.adminCategories.splice(index, 1);  
        } 
      } 
    }); 
  }

}
