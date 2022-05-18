import { Component, OnInit, HostListener, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Settings, AppSettings } from '../app.settings';
import { AppService } from '../app.service';
import { Category } from '../app.models';
import { SidenavMenuService } from '../theme/components/sidenav-menu/sidenav-menu.service';
import { isPlatformBrowser } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { DataService } from '../data.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { globalData } from '../globalVar';
import { CookieService } from 'ngx-cookie-service';
import { MatDialog } from '@angular/material/dialog';
import { LogoutDialogComponent } from './sign-in/logout-dialog/logout-dialog.component';

@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  providers: [SidenavMenuService]
})
export class PagesComponent implements OnInit {
  all_category: any = '';
  showLogOutButton:any;
  phone = "9674147178"
  public showBackToTop: boolean = false;
  public categories: Category[];
  public category: Category;
  public sidenavMenuItems: Array<any>;
  filteredOptions: Observable<string[]>;
  options: string[] = ['One', 'Two', 'Three'];
  @ViewChild('sidenav', { static: true }) sidenav: any;
  // @ViewChild('complete') complete:any;
  myControl = new FormControl();
  public settings: Settings;
  adminTypes: any;
  searchResultData: any
  url = globalData.apiUrl
  searchCat: any;
  searchTerm: any;
  loggedIn:any;
  constructor(public appSettings: AppSettings,
    public appService: AppService,
    public sidenavMenuService: SidenavMenuService,
    public router: Router,
    public dataServe: DataService,
    private httpClient: HttpClient,
    private cookieService:CookieService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: Object) {
    this.settings = this.appSettings.settings;
    this.dataServe.showLogOutButton.subscribe(res=>{
      this.showLogOutButton=res
    })
  }

  ngOnInit() {
    this.getCategories();
   
    this.loggedIn=localStorage.getItem('isLoggedIn')
    this.showLogOutButton=localStorage.getItem('isLoggedIn')=='true'?true:false
    console.log(this.showLogOutButton)
    this.sidenavMenuItems = this.sidenavMenuService.getSidenavMenuItems();
    setTimeout(() => {
      this.settings.theme = 'green';
    });
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );
    console.log(this.appService.Data)
    // this.searchResults()
  }

  public getCategories() {
    this.appService.getCategories().subscribe(data => {
      this.categories = data;
      this.category = data[0];
      this.appService.Data.categories = data;
    })
  }
  showSearch(e: any) {
    console.log(e.target.value)
    this.searchCat = this.all_category.id ? this.all_category.id : 0
    this.searchResults(e.target.value, this.searchCat)
  }
  searchResults(val, cat) {
    this.dataServe.searchProd(val, cat).subscribe(data => {
      console.log(data)
      this.searchResultData = data;
      this.searchResultData = this.searchResultData.msg
      this.filteredOptions = this.myControl.valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value)),
      );
    })
  }
  showResult(res) {
    console.log(res)
    console.log(res)
    this.router.navigate(['/products', res.id, res.prod_name]);
  }
  showResultOnEnter(e: any) {
    console.log(e)
  }
  public searchonEnter(val) {
    console.log(this.all_category.id)
    console.log(val)
    console.log(val.target.value)
    if (val.key == 'Enter') {
      val.preventDefault();
      console.log(this.searchResultData)
      var url_params = this.all_category.id > 0 ? 'term=' + val.target.value + '&cat_id=' + this.all_category.id : 'term=' + val.target.value;
      this.router.navigate(['/products', url_params])


    }

    // console.log(this.complete.val())
  }
  public changeCategory(event) {
    if (event.target) {
      this.category = this.categories.filter(category => category.name == event.target.innerText)[0];
      console.log(this.category);

    }
    if (window.innerWidth < 960) {
      this.stopClickPropagate(event);
    }
  }

  public remove(product) {
    const index: number = this.appService.Data.cartList.indexOf(product);
    if (index !== -1) {
      this.appService.Data.cartList.splice(index, 1);
      this.appService.Data.totalPrice = this.appService.Data.totalPrice - product.offer_price * product.cartCount;
      this.appService.Data.totalCartCount = this.appService.Data.totalCartCount - product.cartCount;
      this.appService.resetProductCartCount(product);
      if(localStorage.getItem('isLoggedIn')=='true')
      var dt={
        prod_dtls:product,
        user_id:localStorage.getItem('userId'),
       }
      this.dataServe.delCart(dt).subscribe(data=>{console.log(data)})
    }
  }

  public clear() {
    this.appService.Data.cartList.forEach(product => {
      this.appService.resetProductCartCount(product);
    });
    
    var dt={
      prod_dtls:this.appService.Data.cartList,
      user_id:localStorage.getItem('userId'),
     }
     this.dataServe.delCart(dt).subscribe(data=>{console.log(data)
      
    })
    this.appService.Data.cartList.length = 0;
      this.appService.Data.totalPrice = 0;
      this.appService.Data.totalCartCount = 0;

  }


  public changeTheme(theme) {
    this.settings.theme = theme;
  }

  public stopClickPropagate(event: any) {
    event.stopPropagation();
    event.preventDefault();
  }




  public scrollToTop() {
    var scrollDuration = 200;
    var scrollStep = -window.pageYOffset / (scrollDuration / 20);
    var scrollInterval = setInterval(() => {
      if (window.pageYOffset != 0) {
        window.scrollBy(0, scrollStep);
      }
      else {
        clearInterval(scrollInterval);
      }
    }, 10);
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          window.scrollTo(0, 0);
        }
      });
    }
  }
  @HostListener('window:scroll', ['$event'])
  onWindowScroll($event) {
    const scrollTop = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop);
    let header_toolbar = document.getElementById('header-toolbar');
    if (header_toolbar) {
      if (scrollTop >= header_toolbar.clientHeight) {
        this.settings.mainToolbarFixed = true;
      }
      else {
        if (!document.documentElement.classList.contains('cdk-global-scrollblock')) {
          this.settings.mainToolbarFixed = false;
        }
      }
    }
    else {
      this.settings.mainToolbarFixed = true;
    }
    ($event.target.documentElement.scrollTop > 300) ? this.showBackToTop = true : this.showBackToTop = false;
  }

  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.sidenav.close();
      }
    });
    this.sidenavMenuService.expandActiveSubMenu(this.sidenavMenuService.getSidenavMenuItems());
  }

  public closeSubMenus() {
    if (window.innerWidth < 960) {
      this.sidenavMenuService.closeAllSubMenus();
    }
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.searchResultData.filter(option => option.toLowerCase().includes(filterValue));
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
  GetChildData(event) {
    console.log(event);
    this.searchResultData=null
    this.all_category = event;
  }
  search_item() {
    console.log({ cat_name: this.all_category.name, cat_id: this.all_category.id, search_item: this.myControl.value });
    this.searchCat = this.all_category.id ? this.all_category.id : 0
    console.log(this.myControl.value);
    if (this.myControl.value&&this.myControl.value.toLowerCase() == this.searchResultData[0].prod_name.toLowerCase()) {
      this.router.navigate(['/products', this.searchResultData[0].id, this.searchResultData[0].prod_name]);

    }
    else {
      if (this.searchCat > 0 && (this.myControl.value == '' || this.myControl.value == null || this.myControl.value == undefined))
        this.router.navigate(['/products', 'cat_id=' + this.searchCat])
      else {
        var url_params = this.all_category.id > 0 ? 'term=' + this.myControl.value + '&cat_id=' + this.all_category.id : 'term=' + this.myControl.value;
        this.router.navigate(['/products', url_params])
  

      }
    }
  }
  logout(){
    const dialogRef=this.dialog.open(LogoutDialogComponent)
    dialogRef.afterClosed().subscribe(status=>{
      if(status)
       {
        this.dataServe.signOut()
        this.dataServe.showLogOutButton.next(false)
        this.clear()
        this.router.navigate(['/'])
       }
      
    })
   
   
  }
}