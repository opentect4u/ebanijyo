import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-sidenav-category-list',
  templateUrl: './sidenav-category-list.component.html',
  styleUrls: ['./sidenav-category-list.component.scss']
})
export class SidenavCategoryListComponent {

 
  @Input() categories;
  @Input() categoryParentId;
  @Output() sendID: EventEmitter<any> = new EventEmitter();
  mainCategories;
  // public categories:Category[] = []; 
  public adminCategories: any = [];
  constructor(private dataServe: DataService, private router: Router) { }

  ngOnInit() {
    this.getCategories()
  }
  public ngDoCheck() {
    if (this.categories && !this.mainCategories) {
      this.mainCategories = this.categories.filter(category => category.parentId == this.categoryParentId);
    }
  }

  public getCategories() {
    //for fetching admin categories
    this.dataServe.userShowSubcat().subscribe(data => {
      this.adminCategories = data
      this.adminCategories = this.adminCategories.msg
      console.log(this.adminCategories)
    })
  }
  public stopClickPropagate(event: any) {
    if (window.innerWidth < 960) {
      event.stopPropagation();
      event.preventDefault();
    }
  }

  public changeCategory(event) {
    // alert("hi")
    // console.log({ id: event.target.id, name: event.target.innerText });
    var dt = {
      id: event.target.id,
      name: event.target.innerText
    }
    this.sendID.emit(dt);
  }
  go_to_list(v: any) {
    // this.router.navigate(['/products','sub_cat_id='+v]).then(()=>{location.reload()})
    // this.router.navigate(['/products','sub_cat_id='+v]).then(()=>{
    //   this.router.navigate(['/products','sub_cat_id='+v])
    // })
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', 'sub_cat_id=' + v]);
    });
  }

}
