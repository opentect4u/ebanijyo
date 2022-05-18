import { Component, OnInit, Input} from '@angular/core';
import { Router, RouterEvent } from '@angular/router';

import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  showLogOutButton:any
  constructor(private router:Router, private dataServe:DataService) { 
    this.dataServe.showLogOutButton.subscribe(status=>{
      this.showLogOutButton=status
    })
  }
  getSub:any;
  showSub:any=[];
  moreSub:any=[];
  moreMenu={id: '0', cat_name: 'All', cat_id: '0', name: 'All'}
  k=0;
  ngOnInit() { 
    this.showLogOutButton=localStorage.getItem('isLoggedIn')=='true'?true:false

    this.dataServe.adminGetSubcategories().subscribe(data=>{
      console.log(data);
      this.getSub=data;
      this.getSub=this.getSub.msg;
      for(let i=0;i<6;i++){
        this.showSub[i]=this.getSub[i]
      }
      for(let i=6;i<this.getSub.length;i++){
        this.moreSub[this.k++]=this.getSub[i]
      }
      console.log(this.moreSub);
      // this.moreSub.push(this.moreMenu)
      console.log(this.showSub);
      this.k=0;
    })
  }

  openMegaMenu(){
    let pane = document.getElementsByClassName('cdk-overlay-pane');
    [].forEach.call(pane, function (el) {
        if(el.children.length > 0){
          if(el.children[0].classList.contains('mega-menu')){
            el.classList.add('mega-menu-pane');
          }
        }        
    });
  }
  go_to_list(v:any){
    // this.router.navigate(['/products','sub_cat_id='+v]).then(()=>{location.reload()})
    // this.router.navigate(['/products','sub_cat_id='+v]).then(()=>{
    //   this.router.navigate(['/products','sub_cat_id='+v])
    // })
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate(['/products','sub_cat_id='+v]);
  });
  }

}
