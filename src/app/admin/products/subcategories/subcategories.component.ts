import { Component, OnInit } from '@angular/core';
import { adminCategory, Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
// import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { SubcatDialogComponent } from './subcat-dialog/subcat-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AppSettings, Settings } from 'src/app/app.settings';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-subcategories',
  templateUrl: './subcategories.component.html',
  styleUrls: ['./subcategories.component.scss']
})
export class SubcategoriesComponent implements OnInit {

  public categories:Category[] = []; 
  public adminSubs:any=[];
  public page: any;
  public count = 6;
  public settings:Settings;
  constructor(public appService: AppService, public dialog: MatDialog, public appSettings:AppSettings,private dataServe:DataService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getSubcat();
  }

  public getSubcat(){   
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetSubcategories().subscribe(data=>{
      this.adminSubs=data
      this.adminSubs=this.adminSubs.msg
      console.log(this.adminSubs)
    })
  }


  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public openSubDialog(data:any,cat_id:any){
    console.log(data);
    console.log(cat_id);
    
    
    const dialogRef = this.dialog.open(SubcatDialogComponent, {
      data: {
        subcat: data,
        catId:cat_id,
        subcats: this.adminSubs
      },
      panelClass: ['theme-dialog'],
      autoFocus: true,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(sub => { 
      if(sub){    
       
        console.log(sub)
        const index: number = this.adminSubs.findIndex(x => x.id == sub.id);
        if(index !== -1){
          console.log(sub)
          this.adminSubs[index] = sub;
         this.getSubcat();
        } 
        else{ 
          console.log(sub)
          let last_sub = this.adminSubs[this.adminSubs.length - 1]; 
          sub.id = last_sub.id + 1;
          this.adminSubs.push(sub);  
          this.getSubcat();
        }          
      }
    });
  }

  public remove(sub:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this sub-category?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.adminSubs.indexOf(sub);
        if (index !== -1) {
          this.dataServe.adminDeleteSubcategories(sub).subscribe(data=>{
            console.log(data)
          })
          this.adminSubs.splice(index, 1);  
        } 
      } 
    }); 
  }


}
