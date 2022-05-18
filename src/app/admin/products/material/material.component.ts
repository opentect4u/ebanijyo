import { Component, OnInit } from '@angular/core';
import { adminCategory, Category } from 'src/app/app.models';
import { AppService } from 'src/app/app.service';
// import { CategoryDialogComponent } from './category-dialog/category-dialog.component';
import { MaterialDialogComponent } from './material-dialog/material-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from 'src/app/shared/confirm-dialog/confirm-dialog.component';
import { AppSettings, Settings } from 'src/app/app.settings';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  public categories:Category[] = []; 
  public adminMaterials:any=[];
  public page: any;
  public count = 6;
  public settings:Settings;
  constructor(public appService: AppService, public dialog: MatDialog, public appSettings:AppSettings,private dataServe:DataService) {
    this.settings = this.appSettings.settings;
  }

  ngOnInit(): void {
    this.getMaterials();
  }

  public getMaterials(){   
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetMaterials().subscribe(data=>{
      this.adminMaterials=data
      this.adminMaterials=this.adminMaterials.msg
      console.log(this.adminMaterials)
    })
  }


  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }

  public openMatDialog(data:any){
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      data: {
        material: data,
        materials: this.adminMaterials
      },
      panelClass: ['theme-dialog'],
      autoFocus: true,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(material => { 
      if(material){    
        const index: number = this.adminMaterials.findIndex(x => x.id == material.id);
        if(index !== -1){
          this.adminMaterials[index] = material;
        } 
        else{ 
          let last_material = this.adminMaterials[this.adminMaterials.length - 1]; 
          material.id = last_material.id + 1;
          this.adminMaterials.push(material);  
        }          
      }
    });
  }

  public remove(material:any){  
    const dialogRef = this.dialog.open(MaterialDialogComponent, {
      maxWidth: "400px",
      data: {
        title: "Confirm Action",
        message: "Are you sure you want remove this material?"
      }
    }); 
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
        const index: number = this.adminMaterials.indexOf(material);
        if (index !== -1) {
          this.dataServe.adminDeleteMaterials(material).subscribe(data=>{
            console.log(data)
          })
          this.adminMaterials.splice(index, 1);  
        } 
      } 
    }); 
  }


}
