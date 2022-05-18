import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { emailValidator, matchingPasswords } from '../../theme/utils/app-validators';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  loginForm: FormGroup;
  registerForm: FormGroup;
  hide = true;
  signInData:any;
  constructor(public formBuilder: FormBuilder, public router:Router, public snackBar: MatSnackBar,private dataServe:DataService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])] 
    });

    this.registerForm = this.formBuilder.group({
      'name': ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      'email': ['', Validators.compose([Validators.required, emailValidator])],
      'phone':['',Validators.required],
      'password': ['', Validators.required],
      'confirmPassword': ['', Validators.required]
    },{validator: matchingPasswords('password', 'confirmPassword')});

  }

  public onLoginFormSubmit(values:Object):void {
    if (this.loginForm.valid) {
     this.dataServe.signIn(values).subscribe(data=>{
       console.log(data)
       this.signInData=data
       if(this.signInData.suc==1)
       {
         var dt={
           email:this.loginForm.controls.email.value,
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
       
       
      }
      else{
      this.snackBar.open(this.signInData.msg, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

      }
    },error=>{
      this.snackBar.open(this.signInData.msg, '×', { panelClass: 'error', verticalPosition: 'top', duration: 3000 });

    })
    }
  }

  public onRegisterFormSubmit(values:Object):void {
    if (this.registerForm.valid) {
      var dt={
        name:this.registerForm.controls.name.value,
        email:this.registerForm.controls.email.value,
        phone:this.registerForm.controls.phone.value,
        password:this.registerForm.controls.password.value,
     }
     this.dataServe.signUp(dt).subscribe(data=>{
       this.signInData=data;
       if(this.signInData.suc==1){
        this.snackBar.open('You registered successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
        this.registerForm.reset()
       }
     })
    }
  }

}
