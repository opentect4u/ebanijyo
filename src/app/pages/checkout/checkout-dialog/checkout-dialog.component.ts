import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';


@Component({
  selector: 'app-checkout-dialog',
  templateUrl: './checkout-dialog.component.html',
  styleUrls: ['./checkout-dialog.component.scss']
})
export class CheckoutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<CheckoutDialogComponent>, 
              @Inject(MAT_DIALOG_DATA) public data: any,
              private router:Router) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
   
}
}
