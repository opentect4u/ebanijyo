import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/data.service';
import { emailValidator, matchingPasswords } from '../../../theme/utils/app-validators';

@Component({
  selector: 'app-information',
  templateUrl: './information.component.html',
  styleUrls: ['./information.component.scss']
})
export class InformationComponent implements OnInit {
  infoForm: FormGroup;
  passwordForm: FormGroup;
  constructor(public formBuilder: FormBuilder, public snackBar: MatSnackBar,private dataServe: DataService) { }
  userName:any;
  userEmail:any;
  changePassData:any;
  changeNameData:any;
  ngOnInit() {
    this.userName=localStorage.getItem('userName');
    this.userEmail=localStorage.getItem('userEmail')
    this.infoForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(3)])],
      
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'id':[localStorage.getItem('userId')]
    });

    this.passwordForm = this.formBuilder.group({
      'currentPassword': ['', Validators.required],
      'newPassword': ['', Validators.required],
      'confirmNewPassword': ['', Validators.required],
      'email':[localStorage.getItem('userEmail')]
    },{validator: matchingPasswords('newPassword', 'confirmNewPassword')});

    this.infoForm.patchValue({
      'name':this.userName,
      'email':this.userEmail

    })
  }

  public onInfoFormSubmit(values:Object):void {
    if (this.infoForm.valid) {
      this.dataServe.changeName(values).subscribe(data=>{
        console.log(data);
        this.changeNameData=data;
        if(this.changeNameData.suc==1)
        this.snackBar.open('Your account information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        localStorage.setItem('userName',this.infoForm.value.name)
        this.dataServe.userName.next(this.infoForm.value.name)
      })
    }
  }

  public onPasswordFormSubmit(values:Object):void {
    if (this.passwordForm.valid) {
      this.dataServe.changePass(values).subscribe(data=>{
        console.log(data);
        this.changePassData=data;
        if(this.changePassData.suc==1)
          this.snackBar.open('Your password changed successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
      })
    }
  }

}
