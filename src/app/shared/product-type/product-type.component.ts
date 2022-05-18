import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {
  @Output() myOutput:EventEmitter<string>= new EventEmitter();  
  constructor(private dataServe: DataService) { }
  adminTypes:any;
  // @Input()types;
  ngOnInit(): void {
    this.getTypes()
  }
  public getTypes(){   
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetProducts().subscribe(data=>{
      this.adminTypes=data
      this.adminTypes=this.adminTypes.msg
      console.log(this.adminTypes)
    })
  }
  showType(id:any){
    // console.log(e);
    this.myOutput.emit(id);  
  }
}
