import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  userName:any;
  userEmail:any;
  userAddress:any;
  constructor() { }

  ngOnInit() {
    this.userName=localStorage.getItem('userName')
    this.userEmail=localStorage.getItem('userEmail')
    this.userAddress=localStorage.getItem('userAddress')
  }

}
