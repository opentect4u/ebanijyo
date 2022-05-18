import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { adminCategory, adminColor, adminMaterial, adminProduct, adminSubcat } from './app.models';
import { globalData } from './globalVar';
function _window():any{
  return window;
  }
@Injectable({
  providedIn: 'root'
})
export class DataService {
  get nativeWindow(){
    return _window();
  }
  url=globalData.apiUrl
  showLogOutButton=new Subject<any>()
  userName=new Subject<any>()
  constructor(private http:HttpClient) { }
  adminGetCategories(): Observable<adminCategory[]>{  
    // fetch categories
   return this.http.get<adminCategory[]>(this.url+'admin/category?id=')
  }
 
  adminPostCategories(catData:any){
    //add and edit categories
    return this.http.post(this.url+'admin/category',catData)
  }
  adminDeleteCategories(id:any){
    //delete categories
    return this.http.post(this.url+'admin/category_del',id)
  }
  adminGetMaterials():Observable<adminMaterial[]>{
   return this.http.get<adminMaterial[]>(this.url+'admin/material?id=')

  }
  adminPostMaterials(matData:any){
    //add and edit materials
    return this.http.post(this.url+'admin/material',matData)
  }
  adminDeleteMaterials(id:any){
    //delete materials
    return this.http.post(this.url+'admin/material_del',id)
  }
  adminGetProducts():Observable<adminProduct[]>{
    return this.http.get<adminProduct[]>(this.url+'admin/product_type?id=')
 
   }
   adminPostProducts(matData:any){
     //add and edit materials
     return this.http.post(this.url+'admin/product_type',matData)
   }
   adminDeleteProducts(id:any){
     //delete materials
     return this.http.post(this.url+'admin/product_type_del',id)
   }
   adminGetColors():Observable<adminColor[]>{
    return this.http.get<adminColor[]>(this.url+'admin/color?id=')
 
   }
   adminPostColors(colData:any){
     //add and edit materials
     return this.http.post(this.url+'admin/color',colData)
   }
   adminDeleteColors(id:any){
     //delete materials
     return this.http.post(this.url+'admin/color_del',id)
   }
   adminGetSubcategories():Observable<adminSubcat[]>{
    return this.http.get<adminSubcat[]>(this.url+'admin/sub_category?id=')
 
   }
   adminGetSubcategoriesbyID(v:any){  
    // fetch categories
   return this.http.get<adminCategory[]>(this.url+'admin/sub_category?id='+v)
  }
  adminGetSubcategoriesbyCat_id(v:any){  
    // fetch categories
   return this.http.get<adminCategory[]>(this.url+'admin/sub_category?cat_id='+v)
  }
   adminPostSubcategories(subData:any){
    //  console.log(subData)
     //add and edit materials
     return this.http.post(this.url+'admin/sub_category',subData)
   }
   adminDeleteSubcategories(id:any){
     //delete materials
     return this.http.post(this.url+'admin/sub_category_del',id)
   }


   adminPostInfo(dt:any){
     console.log(dt)
     //submit product info (first step in the stepper)
     return this.http.post(this.url+'product/prod',dt);
   }
   adminPostDesc(dt:any){
    console.log(dt)

      //submit product desc (second step in the stepper)
    return this.http.post(this.url+'product/prod_dtls',dt);
  }
  adminPostPrice(dt:any){
    console.log(dt)

     //submit product price (third step in the stepper)
    return this.http.post(this.url+'product/prod_price',dt);
  }
  adminGetAllProductsById(id:any){
    //get products by id
    return this.http.get(this.url+'product/prod?id='+id)
  }
  adminGetProductList(id:any){
    return this.http.get(this.url+'product/all_prod_list?id='+id)
  }
  adminPostImages(prodName:any,dt:any,itemId:any,user:any){
    const formdata=new FormData();
    formdata.append('prod_name',prodName);
    formdata.append('user',user);
    formdata.append('item_id',itemId);
    
    for(let Img of dt){
      formdata.append('file',Img)  
    }
   return this.http.post(this.url+'product/prod_img_upload',formdata)


  }
  adminDelPrevImg(id:any,path:any){
    var dt={
      "id":id,
      "img_path":path
    }
    console.log(dt)
    return this.http.post(this.url+'product/prod_img_del',dt)
  }
  adminDelProduct(id:any,name:any){
    var dt={
      "id":id,
      "item_name":name
    }
    return this.http.post(this.url+'product/prod_del',dt)

  }
  userShowSubcat(){
    return this.http.get(this.url+'admin/cat_sub_list')
  }
  adminPostBanner(dt:any){
    const formdata=new FormData();
    formdata.append('id',dt.id);
    formdata.append('user',dt.user);
    formdata.append('param_id',dt.param_id);
    formdata.append('param_name',dt.param_name);
    formdata.append('heading',dt.heading);
    formdata.append('sub_heading',dt.sub_heading);
    formdata.append('page_url',dt.page_url);
    formdata.append('file',dt.file)
    
    return this.http.post(this.url+'params/banner',formdata)
  }
  adminGetBanner(id:any,flag:any){
    return this.http.get(this.url+'/params/banner?id=&param_id='+id+'&flag='+flag)
  }
  adminGetParams(){
    return this.http.get(this.url+'params')
  }
  adminGetProdById(id:any){
    
    return this.http.get(this.url+'product/all_prod_list?'+id)

  }
  addFeatured(dt:any){
   return this.http.post(this.url+'params/featured',dt)
  }
  getFeatured(type:any){
    return this.http.get(this.url+'params/featured?type='+type)
  }
  getCarousalByLabel(lbl:any){
    return this.http.get(this.url+'product/prod_dash?flag='+lbl)
  }
  adminRelatedProductList(id:any,cat_id:any,limit:any){
    return this.http.get(this.url+'product/related_product?id='+id+'&cat_id='+cat_id+'&limit='+limit)
  }
  bannerDel(dt:any){
    return this.http.post(this.url+'params/banner_del',dt)
  }
  sortProdList(id:any,sortFlag:any){
    return this.http.get(this.url+'product/all_prod_list?'+id+'&sort_flag='+sortFlag)

  }
  searchProd(val: any,cat:any) {
    var dt = {
      name: val,
      cat_id:cat
    }
    return this.http.post(this.url + 'product/search', dt)
  }
  getCountries(){
    return this.http.get(this.url + '/admin/country')

  }
  postBillingData(dt:any){
    return this.http.post(this.url+'user',dt)
  }
  postTrans(dt:any){
    return this.http.post(this.url+'check_out/transaction',dt)
  }
  postCheckout(dt:any){
    return this.http.post(this.url+'check_out',dt)
  }
  signIn(dt:any){
    return this.http.post(this.url+'user/login',dt)
  }
  signUp(dt:any){
    return this.http.post(this.url+'user/registration',dt)

  }
  getItemStock(){
    return this.http.get(this.url+'product/stock_list')
  }
  editItemStock(dt){
    return this.http.post(this.url+'product/stock_entry',dt)
  }
  getUserDetails(id:any){
    return this.http.get(this.url+'user/details?id='+id)

  }
  putCart(dt:any){
    return this.http.post(this.url+'cart',dt)
  }
  putWishList(dt:any){
    return this.http.post(this.url+'wishlist',dt)
  }
  getCart(id:any){
    return this.http.get(this.url+'cart?user_id='+id)
  }
  getWishList(id:any){
    return this.http.get(this.url+'wishlist?user_id='+id)
  }
  delCart(dt:any){
    return this.http.post(this.url+'cart/del',dt)
  }
  delWishList(dt:any){
    return this.http.post(this.url+'wishlist/del',dt)
  }
  changePass(dt:any){
    return this.http.post(this.url+'user/changePassword',dt)
  }
  changeName(dt:any){
    return this.http.post(this.url+'user/changeName',dt)
  }
  getOrderHistory(id:any){
    return this.http.get(this.url+'user/orderHistory?user_id='+id)
  }
  putUserData(dt:any){
     console.log(dt)
     localStorage.setItem('userEmail',dt.email)
     localStorage.setItem('isLoggedIn',dt.loggedIn);
     localStorage.setItem('userId',dt.userId)
     localStorage.setItem('userName',dt.name),
     localStorage.setItem('userAddress',dt.address),
     localStorage.setItem('userCountry',dt.country_id),
     localStorage.setItem('userState',dt.state),
     localStorage.setItem('userCity',dt.city),
     localStorage.setItem('userZip',dt.zip_code),
     localStorage.setItem('userPhone',dt.phone_no)
 }
 contactUs(dt:any){
   return this.http.post(this.url+'admin/contact_us',dt)
 }
 signOut(){
   localStorage.clear()
 }

}
