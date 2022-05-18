import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { emailValidator } from 'src/app/theme/utils/app-validators';
import { DataService } from 'src/app/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-controls-dialog',
  templateUrl: './controls-dialog.component.html',
  styleUrls: ['./controls-dialog.component.scss']
})
export class ControlsDialogComponent implements OnInit {
  @ViewChild('emailData')emailData:ElementRef;
  @ViewChild('passwordData')passwordData:ElementRef;
  constructor(private snackBar:MatSnackBar, private router:Router, private dataServe:DataService, public formBuilder: FormBuilder,public dialogRef: MatDialogRef<ControlsDialogComponent>) { }
  loginForm: FormGroup;
  showLoginForm=false;
  signInData:any;
  hide = true;
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])] 
    });
  }
  onDismiss(){
    this.dialogRef.close(false)
  }
  onConfirm(){
    this.showLoginForm=true
    // this.dialogRef.close(true)

  }
  public onLoginFormSubmit_modal(values:Object):void {
   console.log(this.emailData.nativeElement.value,this.passwordData.nativeElement.value)
   var dt1={
     email:this.emailData.nativeElement.value,
     password:this.passwordData.nativeElement.value
   }
  
     this.dataServe.signIn(dt1).subscribe(data=>{
       console.log(data)
       this.signInData=data
       if(this.signInData.suc==1)
       {
         var dt={
           email:this.emailData.nativeElement.value,
           loggedIn:true,
           userId:this.signInData.msg[0].userId,
           name:this.signInData.msg[0].name,
           address:this.signInData.msg[0].address,
           country_id:this.signInData.msg[0].country_id,
           state:this.signInData.msg[0].state,
           city:this.signInData.msg[0].city,
           zip_code:this.signInData.msg[0].zip_code,
           phone_no:this.signInData.msg[0].phone_no
       }
       
        this.dataServe.putUserData(dt)
        
        this.router.navigate(['/']);
        this.dataServe.showLogOutButton.next(true)
        this.dialogRef.close()

       
       
      }
      else{
      this.snackBar.open(this.signInData.msg, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
    },error=>{
      this.snackBar.open(this.signInData.msg, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    })
   
  }

}
