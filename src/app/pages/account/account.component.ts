import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { LogoutDialogComponent } from '../sign-in/logout-dialog/logout-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  
  public sidenavOpen:boolean = true;
  public links = [
    { name: 'Account Dashboard', href: 'dashboard', icon: 'dashboard' },
    { name: 'Account Information', href: 'information', icon: 'info' },
    { name: 'Addresses', href: 'addresses', icon: 'location_on' },
    { name: 'Order History', href: 'orders', icon: 'add_shopping_cart' },  
    { name: 'Logout', href: '/sign-in', icon: 'power_settings_new' },    
  ];
  constructor(public router:Router,private dataServe:DataService,private dialog:MatDialog,private appService:AppService) { }

  ngOnInit() {
    
    if(window.innerWidth < 960){
      this.sidenavOpen = false;
    };
  }

  @HostListener('window:resize')
  public onWindowResize():void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
  }

  ngAfterViewInit(){
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) { 
        if(window.innerWidth < 960){
          this.sidenav.close(); 
        }
      }                
    });
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
  logout(link:any){
     if(link.name=='Logout'){
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
}
