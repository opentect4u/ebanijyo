import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { Category } from 'src/app/app.models';
@Component({
  selector: 'app-subcat-dialog',
  templateUrl: './subcat-dialog.component.html',
  styleUrls: ['./subcat-dialog.component.scss']
})
export class SubcatDialogComponent implements OnInit {
  public selectedCatId:any;
  public form: FormGroup;
  user="admin@gmail.com"
  constructor(public dialogRef: MatDialogRef<SubcatDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public dataServe:DataService
              ) { this.selectedCatId=this.data.catId;
                console.log(this.selectedCatId)
                console.log(this.data)
              }
  public categories:Category[] = []; 
  public adminCategories:any=[];
  ngOnInit(): void { 
    this.getCategories();
    this.form = this.fb.group({
      id: 0,
      cat_id: [this.selectedCatId, Validators.required],
      name: [null, Validators.required],
      user: this.user
    }); 
console.log(this.form);

    if(this.data.subcat){
      this.form.patchValue(this.data.subcat); 
    };
  }
  public getCategories(){   
      //for fetching admin categories
    this.dataServe.adminGetCategories().subscribe(data=>{
      this.adminCategories=data
      this.adminCategories=this.adminCategories.msg
      console.log(this.adminCategories)
    })
  }
  public onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      this.dataServe.adminPostSubcategories(this.form.value).subscribe(data=>{
        console.log(data)
      })
    }
  }
  disp(v:any){
    // console.log(v)
    this.selectedCatId=v;
  }

}
