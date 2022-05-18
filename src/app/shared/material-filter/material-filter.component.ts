import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-material-filter',
  templateUrl: './material-filter.component.html',
  styleUrls: ['./material-filter.component.scss']
})
export class MaterialFilterComponent implements OnInit {
  @Output() materialOutput:EventEmitter<string>= new EventEmitter(); 
  constructor(private dataServe:DataService) { }
  adminMaterials:any
  ngOnInit(): void {
    this.getMaterials()
  }
  public getMaterials(){   
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetMaterials().subscribe(data=>{
      this.adminMaterials=data
      this.adminMaterials=this.adminMaterials.msg
      console.log(this.adminMaterials)
    })
  }
  showMaterial(id:any){
     this.materialOutput.emit(id)
  }
}
