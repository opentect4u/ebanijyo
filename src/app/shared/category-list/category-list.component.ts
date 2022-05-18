import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent {

  @Input() categories;
  @Input() categoryParentId;
  @Output() myOutput: EventEmitter<any> = new EventEmitter();
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
    console.log({ id: event.target.id, name: event.target.innerText });
    var dt = {
      id: event.target.id,
      name: event.target.innerText
    }
    this.myOutput.emit(dt);
  }
  go_to_list(v: any) {
    
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', 'sub_cat_id=' + v]);
    });
  }
}