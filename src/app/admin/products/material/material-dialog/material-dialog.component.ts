import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
@Component({
  selector: 'app-material-dialog',
  templateUrl: './material-dialog.component.html',
  styleUrls: ['./material-dialog.component.scss']
})
export class MaterialDialogComponent implements OnInit {

  public form: FormGroup;
  user="admin@gmail.com"
  constructor(public dialogRef: MatDialogRef<MaterialDialogComponent>, 
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

    if(this.data.material){
      this.form.patchValue(this.data.material); 
    };
  }

  public onSubmit(){
    console.log(this.form.value);
    if(this.form.valid){
      this.dialogRef.close(this.form.value);
      this.dataServe.adminPostMaterials(this.form.value).subscribe(data=>{
        console.log(data)
      })
    }
  }

}
