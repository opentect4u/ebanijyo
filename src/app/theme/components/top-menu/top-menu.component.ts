import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { DataService } from 'src/app/data.service';
import { AppService } from '../../../app.service';
import { Settings, AppSettings } from '../../../app.settings';
import { DialogRole, MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from 'src/app/pages/sign-in/logout-dialog/logout-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html'
})
export class TopMenuComponent implements OnInit {
  public currencies = ['USD', 'EUR'];
  public currency:any; 

  public settings: Settings;
  showLogOutButton: any;
  userEmail:any;
  userName:any;
  constructor(private router:Router, private dialog:MatDialog, private dataServe:DataService, public appSettings:AppSettings, public appService:AppService, public translateService: TranslateService) { 
    this.settings = this.appSettings.settings; 
    this.dataServe.showLogOutButton.subscribe(res=>{
      this.showLogOutButton=res
    })
    this.dataServe.userName.subscribe(res=>{
      this.userName=res
    })
  } 

  ngOnInit() {
    console.log(this.appService.Data.wishList.length)
    this.currency = this.currencies[0];  
    this.showLogOutButton=localStorage.getItem('isLoggedIn')=='true'?true:false
    this.userEmail=localStorage.getItem('userEmail')
    this.userName=localStorage.getItem('userName')
    console.log(this.userEmail,this.userName)
    this.dataServe.userName.subscribe(res=>{
      this.userName=res
    })
    // console.log(this.userName)
  }

  public changeCurrency(currency){
    this.currency = currency;
  } 

  public changeLang(lang:string){ 
    this.translateService.use(lang);   
  } 

  public getLangText(lang){
    if(lang == 'de'){
      return 'German';
    }
    else if(lang == 'fr'){
      return 'French';
    }
    else if(lang == 'ru'){
      return 'Russian';
    }
    else if(lang == 'tr'){
      return 'Turkish';
    }
    else{
      return 'English';
    }
  } 
  public clear() {
    this.appService.Data.cartList.forEach(product => {
      this.appService.resetProductCartCount(product);
    });
    
    var dt={
      prod_dtls:this.appService.Data.cartList,
      user_id:localStorage.getItem('userId'),
     }
     this.dataServe.delCart(dt).subscribe(data=>{console.log(data)
      
    })
    this.appService.Data.cartList.length = 0;
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;

  }
  logout(){
    const dialogRef=this.dialog.open(LogoutDialogComponent)
    dialogRef.afterClosed().subscribe(status=>{
      if(status)
       {
        this.dataServe.signOut()
        this.dataServe.showLogOutButton.next(false)
        this.clear()
        this.router.navigate(['/'])
       }
      
    })
  }
}
