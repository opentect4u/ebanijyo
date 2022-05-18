import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { emailValidator } from '../../theme/utils/app-validators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm: FormGroup;
  message:any;
  status:any;
  constructor(public formBuilder: FormBuilder, private dataService:DataService,private _snackBar:MatSnackBar) { }

  ngOnInit() {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, emailValidator])],
      phone: ['', Validators.required],
      message: ['', Validators.required],
      user:[localStorage.getItem('userEmail')?localStorage.getItem('userEmail'):null]
    });
  }

  public onContactFormSubmit(values:Object):void {
    if (this.contactForm.valid) {
      console.log(values);
      this.dataService.contactUs(values).subscribe(data=>{
        console.log(data)
        this.message=data;
        this.status=this.message.suc==1?'success':'error'
      this._snackBar.open('Data saved!!', '×', { panelClass: [this.status], verticalPosition: 'top', duration: 3000 });

      },error=>{
        this.message='Error while inserting data!'
        this.status='error'
      this._snackBar.open(this.message, '×', { panelClass: [this.status], verticalPosition: 'top', duration: 3000 });

      })

    }
  }

}
