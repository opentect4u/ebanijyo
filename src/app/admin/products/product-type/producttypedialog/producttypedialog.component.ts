import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-producttypedialog',
  templateUrl: './producttypedialog.component.html',
  styleUrls: ['./producttypedialog.component.scss']
})
export class ProducttypedialogComponent implements OnInit {

  public form: FormGroup;
  user="admin@gmail.com"
  constructor(public dialogRef: MatDialogRef<ProducttypedialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public dataServe:DataService
              ) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      type_name: [null, Validators.required],
      user: this.user
    }); 
    // console.log(this.data);
    
    if(this.data.type){
      // console.log('IF here');
      
      this.form.patchValue(this.data.type); 
    };
  }

  public onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      this.dataServe.adminPostProducts(this.form.value).subscribe(data=>{
        console.log(data)
      })
    }
  }

}
