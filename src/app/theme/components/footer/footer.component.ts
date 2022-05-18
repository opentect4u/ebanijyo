import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  // public lat: number = 40.678178;
  public lat: number = 22.5152;
  // public lng: number = -73.944158;
  public lng: number = 88.3933;
  public zoom: number = 12;

  constructor(private appServe:AppService,public snackBar: MatSnackBar,private router:Router) { }

  ngOnInit() { }

  subscribe(){ }

  checkout(){
    if(this.appServe.Data.cartList.length<=0){
      var message = 'You have nothing inside cart!'; 
      var status = 'error';          
      this.snackBar.open(message, '×', { panelClass: [status], verticalPosition: 'top', duration: 3000 });
    }
    else{
        this.router.navigate(['/checkout'])
    }
  }

}