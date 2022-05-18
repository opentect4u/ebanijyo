import { Component, Inject, OnInit } from '@angular/core';
import { inject } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Data } from 'src/app/app.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-item-stock-dialog',
  templateUrl: './item-stock-dialog.component.html',
  styleUrls: ['./item-stock-dialog.component.scss']
})
export class ItemStockDialogComponent implements OnInit {
  form:FormGroup
  constructor(public dialogref:MatDialogRef<ItemStockDialogComponent>,
              @Inject(MAT_DIALOG_DATA)public data:any,
              public fb: FormBuilder,
              private dataServe: DataService
              ) { }

  ngOnInit(): void {
    this.form=this.fb.group({
      ostock:['',Validators.required],
      stockinHand:['',Validators.required],
      entry:['',Validators.required]
    })
   
    this.form.patchValue({
      ostock:this.data.stock.opening_stock,
      stockinHand:this.data.stock.stock_in_hand
    })
  
  }
  onSubmit(){
    // console.log(this.form)
    // console.log(this.data.stock.id);
    this.dialogref.close(this.form.value)
    var dt={
      prod_id:this.data.stock.id,
      ostock:this.form.value.ostock,
      entry:this.form.value.entry,
      flag:'1',
      user_id:'1',
      user:'admin@gmail.com'
    }
    // console.log(dt);
    this.dataServe.editItemStock(dt).subscribe(data=>{console.log(data)})
  }

}
