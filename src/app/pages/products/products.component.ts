import { Component, OnInit, ViewChild, HostListener, Inject, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ProductDialogComponent } from '../../shared/products-carousel/product-dialog/product-dialog.component';
import { AppService } from '../../app.service';
import { Product, Category } from "../../app.models";
import { Settings, AppSettings } from 'src/app/app.settings';
import { isPlatformBrowser } from '@angular/common';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  @ViewChild('sidenav', { static: true }) sidenav: any;
  public sidenavOpen: boolean = true;
  private sub: any;
  public viewType: string = 'grid';
  public viewCol: number = 25;
  public counts = [12, 24, 36];
  public count: any;
  public sortings = [{ sort_flag: 0, sort_type: "Highest to Lowest" }, { sort_flag: 1, sort_type: "Lowest to Highest" }];
  public sort: any;
  public products: any = [];
  public categories: Category[];
  public adminColors: any = [];
  public brands = [];
  urlID: any;
  urlName: any;
  public priceFrom: number = 100;
  public priceTo: number = 1000;
  public colors = [
    { name: "#5C6BC0", selected: false },
    { name: "#66BB6A", selected: false },
    { name: "#EF5350", selected: false },
    { name: "#BA68C8", selected: false },
    { name: "#FF4081", selected: false },
    { name: "#9575CD", selected: false },
    { name: "#90CAF9", selected: false },
    { name: "#B2DFDB", selected: false },
    { name: "#DCE775", selected: false },
    { name: "#FFD740", selected: false },
    { name: "#00E676", selected: false },
    { name: "#FBC02D", selected: false },
    { name: "#FF7043", selected: false },
    { name: "#F5F5F5", selected: false },
    { name: "#696969", selected: false }
  ];
  public sizes = [
    { name: "S", selected: false },
    { name: "M", selected: false },
    { name: "L", selected: false },
    { name: "XL", selected: false },
    { name: "2XL", selected: false },
    { name: "32", selected: false },
    { name: "36", selected: false },
    { name: "38", selected: false },
    { name: "46", selected: false },
    { name: "52", selected: false },
    { name: "13.3\"", selected: false },
    { name: "15.4\"", selected: false },
    { name: "17\"", selected: false },
    { name: "21\"", selected: false },
    { name: "23.4\"", selected: false }
  ];
  public page: any;
  public settings: Settings;
  adminTypes: any;
  searchResultData: any;
  constructor(public appSettings: AppSettings,
    private activatedRoute: ActivatedRoute,
    public appService: AppService,
    public dialog: MatDialog,
    private router: Router,
    private dataServe: DataService,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;
  }
  url = globalData.apiUrl
  ngOnInit() {
    this.count = this.counts[0];
    this.sort = this.sortings[0];
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log(params['name']);
      this.urlName = params['name'];
      this.urlID = params['id']
      console.log(params['id']);
      console.log(this.urlName)
      if (this.urlName.split('=')[0] != 'term') {
        console.log(this.urlName)
        this.getAllProducts(this.urlID, this.urlName);

      }
      else {
        console.log(this.urlName.split('='));
        var elements = this.urlName.split('=')
        var first_element = elements[0]
        var first_value = elements.length > 2 ? elements[1].split('&')[0] : elements[1];
        var second_element, second_value;

        if(elements.length > 2){
          second_element = elements[1].split('&')[1]
          second_value = elements[2];
        }
        console.log(first_element + '=' + first_value, second_element +'='+ second_value);
        
        this.getSearchResults(first_value,second_value)

      }
    });
    if (window.innerWidth < 960) {
      this.sidenavOpen = false;
    };
    if (window.innerWidth < 1280) {
      this.viewCol = 33.3;
    };

    console.log(this.urlName)
    this.getCategories();
    this.getBrands();
    // if(this.urlName.split('=')[0]!='term')
    // this.getAllProducts(this.urlID,this.urlName); 
    // else
    // this.getSearchResults(this.urlName.split('=')[1])
    this.getColors()
    this.getTypes()
    this.changeSorting(this.sortings[0])
  }

  public getAllProducts(id: any, name: any) {
    if (!id && name) {
      this.dataServe.adminGetProdById(name).subscribe(data => {
        console.log(data)
        this.products = data;
        this.products = this.products.msg;
      })
    }
    // else{
    //   this.dataServe.adminGetProductList(null).subscribe(data=>{
    //     console.log(data)
    //     this.products=data;
    //     this.products=this.products.msg;
    //   })
    // }
  }
  getSearchResults(val,cat) {
    this.dataServe.searchProd(val,cat).subscribe(data => {
      console.log(data)
      this.products = data;
      this.products = this.products.msg
    })
  }
  public getColors() {
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetColors().subscribe(data => {
      this.adminColors = data
      this.adminColors = this.adminColors.msg
      console.log(this.adminColors)
    })
  }
  public getCategories() {
    if (this.appService.Data.categories.length == 0) {
      this.appService.getCategories().subscribe(data => {
        this.categories = data;
        this.appService.Data.categories = data;
      });
    }
    else {
      this.categories = this.appService.Data.categories;
    }
  }

  public getBrands() {
    this.brands = this.appService.getBrands();
    this.brands.forEach(brand => { brand.selected = false });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  @HostListener('window:resize')
  public onWindowResize(): void {
    (window.innerWidth < 960) ? this.sidenavOpen = false : this.sidenavOpen = true;
    (window.innerWidth < 1280) ? this.viewCol = 33.3 : this.viewCol = 25;
  }

  public changeCount(count) {
    this.count = count;
    this.getAllProducts(this.urlID, this.urlName);
  }

  public changeSorting(sort) {
    this.sort = sort;
    console.log(this.urlName)
    this.dataServe.sortProdList(this.urlName, sort.sort_flag).subscribe(data => {
      console.log(data)
      this.products = data;
      this.products = this.products.msg;

    })
  }

  public changeViewType(viewType, viewCol) {
    this.viewType = viewType;
    this.viewCol = viewCol;
  }

  public openProductDialog(product) {
    let dialogRef = this.dialog.open(ProductDialogComponent, {
      data: product,
      panelClass: 'product-dialog',
      direction: (this.settings.rtl) ? 'rtl' : 'ltr'
    });
    dialogRef.afterClosed().subscribe(product => {
      if (product) {
        this.router.navigate(['/products', product.id, product.prod_name]);
      }
    });
  }

  public onPageChanged(event) {
    this.page = event;
    this.getAllProducts(this.urlID, this.urlName);
    if (isPlatformBrowser(this.platformId)) {
      window.scrollTo(0, 0);
    }
  }

  public onChangeCategory(event) {
    if (event.target) {
      // this.router.navigate(['/products', event.target.innerText.toLowerCase()]); 
      // this.router.navigate(['/products', 'cat_id='+event.target.id]).then(()=>{location.reload()}); 
      // this.router.navigate(['/products', 'cat_id='+event.target.id]); 
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/products', 'cat_id=' + event.target.id]);
      });
    }
  }
  from_price() {

    this.priceTo = this.priceFrom + 50
    console.log(this.priceTo)
    //    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate(['/products', 'cat_id='+event.target.id]);
    // });
    //  this.router.navigate(['/products', 'min='+this.priceFrom+'&max'+this.priceTo]); 

  }
  to_price() {
    //   this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
    //     this.router.navigate(['/products', 'cat_id='+event.target.id]);
    // });
    // this.router.navigate(['/products', 'min='+this.priceFrom+'&max'+this.priceTo]); 

  }
  public getTypes() {
    //template
    // this.appService.getCategories().subscribe(data => {
    //   this.categories = data; 
    //   this.categories.shift();
    // }); 

    //for fetching admin categories
    this.dataServe.adminGetProducts().subscribe(data => {
      this.adminTypes = data
      this.adminTypes = this.adminTypes.msg
      console.log(this.adminTypes)
    })
  }
  getTypeFromChild(data) {
    console.log(data);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', 'type_id=' + data]);
    });
  }
  getMaterialFromChild(data) {
    console.log(data);
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', 'mat_id=' + data]);
    });
  }
  sendCatIdForFilter(data){
    console.log(data)
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/products', 'cat_id=' + data.id]);
    });
  }

}
