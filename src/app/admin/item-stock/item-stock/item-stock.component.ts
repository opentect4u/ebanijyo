import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { MatDialog } from '@angular/material/dialog';
import { ItemStockDialogComponent } from '../item-stock-dialog/item-stock-dialog.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppSettings, Settings } from 'src/app/app.settings';
@Component({
  selector: 'app-item-stock',
  templateUrl: './item-stock.component.html',
  styleUrls: ['./item-stock.component.scss']
})
export class ItemStockComponent implements OnInit {
  settings: Settings;

  constructor(private dataServe:DataService,public dialog: MatDialog,public appSettings:AppSettings) {
    this.settings = this.appSettings.settings;

   }
  stockData:any;
  public page: any;
  public count = 6;
  public limit:any;
  ngOnInit(): void {
    this.getStock()
  }
  getStock(){
    this.dataServe.getItemStock().subscribe(data=>{
      console.log(data);
      this.stockData=data;
      this.stockData=this.stockData.msg
    })
  }
  public onPageChanged(event){
    this.page = event; 
    window.scrollTo(0,0); 
  }
  edit(stock){
    const dialogRef = this.dialog.open(ItemStockDialogComponent,{
      data: {
        stock: stock,
        stocks: this.stockData
      },
      panelClass: ['theme-dialog'],
      autoFocus: true,
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    })
    dialogRef.afterClosed().subscribe(dialogResult => { 
      if(dialogResult){
       this.getStock()
       
      } 
    })
  }
}
