import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-color-dialog',
  templateUrl: './color-dialog.component.html',
  styleUrls: ['./color-dialog.component.scss']
})
export class ColorDialogComponent implements OnInit {
  public form: FormGroup;
  user="admin@gmail.com"
  constructor(public dialogRef: MatDialogRef<ColorDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              public fb: FormBuilder,
              public dataServe:DataService
              ) { }

  ngOnInit(): void { 
    this.form = this.fb.group({
      id: 0,
      color_name: [null, Validators.required],
      color_code: [null, Validators.required],
      user: this.user
    }); 

    if(this.data.color){
      this.form.patchValue(this.data.color); 
    };
  }

  public onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      this.dataServe.adminPostColors(this.form.value).subscribe(data=>{
        console.log(data)
      })
    }
  }


}
