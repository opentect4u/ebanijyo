import { Component, OnInit } from '@angular/core';
import { ProducttypedialogComponent } from './producttypedialog/producttypedialog.component'
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
// import { ProducttypedialogComponent } from './producttypedialog/producttypedialog.component'
import { AppSettings, Settings } from 'src/app/app.settings';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  // public categories:Category[] = []; 
  public adminTypes:any=[];
  public page: any;
  public count = 6;
  public settings:Settings;
  constructor(public dialog: MatDialog, public appSettings:AppSettings,private dataServe:DataService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getTypes();
  }

  public getTypes(){   
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetProducts().subscribe(data=>{
      this.adminTypes=data
      this.adminTypes=this.adminTypes.msg
      console.log(this.adminTypes)
    })
  }


  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public openTypeDialog(dt:any){
    console.log(dt);
    
    // console.log(this.adminTypes)
    const dialogRef = this.dialog.open(ProducttypedialogComponent, {
      data: {
        type: dt,
        types: this.adminTypes
      },
      panelClass: ['theme-dialog'],
      autoFocus: true,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    // console.log(dialogRef);
    
    dialogRef.afterClosed().subscribe(type => {       
      if(type){   
        
        const index: number = this.adminTypes.findIndex(x => x.id == type.id);
        if(index !== -1){
          this.adminTypes[index] = type;
        } 
        else{ 
          
          let last_type = this.adminTypes[this.adminTypes.length - 1]; 
          type.id = last_type.id + 1;
          this.adminTypes.push(type);  
        }          
      }
    });
  }

  public remove(type:any){  
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this type?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.adminTypes.indexOf(type);
        if (index !== -1) {
          this.dataServe.adminDeleteProducts(type).subscribe(data=>{
            console.log(data)
          })
          this.adminTypes.splice(index, 1);  
        } 
      } 
    }); 
  }


}
