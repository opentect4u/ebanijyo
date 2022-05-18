import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-category-dialog',
  templateUrl: './category-dialog.component.html',
  styleUrls: ['./category-dialog.component.scss']
})
export class CategoryDialogComponent implements OnInit {
  public form: FormGroup;
  user="admin@gmail.com"
  constructor(public dialogRef: MatDialogRef<CategoryDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public dataServe:DataService
              ) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      name: [null, Validators.required],
      user: this.user
    }); 

    if(this.data.category){
      this.form.patchValue(this.data.category); 
    };
  }

  public onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      this.dataServe.adminPostCategories(this.form.value).subscribe(data=>{
        console.log(data)
      })
    }
  }

}
