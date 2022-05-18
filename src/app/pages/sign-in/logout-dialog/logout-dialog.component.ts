import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-logout-dialog',
  templateUrl: './logout-dialog.component.html',
  styleUrls: ['./logout-dialog.component.scss']
})
export class LogoutDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<LogoutDialogComponent>) { }

  ngOnInit(): void {
  }
  onDismiss(){
    this.dialogRef.close(false)
  }
  onConfirm(){
    this.dialogRef.close(true)

  }
}
