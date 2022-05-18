import { Component, OnInit,ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AppService } from 'src/app/app.service';
import { Category } from 'src/app/app.models';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TransitionCheckState } from '@angular/material/checkbox';
import { HttpClient } from '@angular/common/http';
import { globalData } from 'src/app/globalVar';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  public form: FormGroup;
  public colors = ["#5C6BC0", "#66BB6A", "#EF5350", "#BA68C8", "#FF4081", "#9575CD", "#90CAF9", "#B2DFDB", "#DCE775", "#FFD740", "#00E676", "#FBC02D", "#FF7043", "#F5F5F5", "#696969"];
  public sizes = ["S", "M", "L", "XL", "2XL", "32", "36", "38", "46", "52", "13.3\"", "15.4\"", "17\"", "21\"", "23.4\""];
  public selectedColors: string;
  public adminCategories: any = [];
  private sub: any;
  public id: any;
  user = "admin@gmail.com";
  isLinear = true;
  infoFormGroup: FormGroup;
  descFormGroup: FormGroup;
  priceFormGroup: FormGroup;
  imgFormGroup: FormGroup;
  submitInfoData: any;
  submitConfirmData: any;
  stepperVal: any;
  adminSubs: any = [];
  adminTypes: any = [];
  adminMaterials: any = [];
  adminColors: any = [];
  getProductData: any = [];
  getProductData_copy: any = [];
  submitImgData: any;
  catval: any;
  subcatval: any;
  material: any;
  color: any;
  ptype: any;
  unitval: any;
  offer_price: any;
  sell_price: any;
  discount_val: any;
  getCat: any;
  getSub: any;
  prodName: any;
  getProdType: any;
  getProdCol: any;
  getProdUnit: any;
  getProdMat: any;
  getVendor: any;
  getWeight: any;
  getHeight: any;
  getWidth: any;
  getHistory: any;
  getU: any
  getDesc: any;
  getCp: any;
  getSp: any;
  getOp: any;
  getDis: any;
  getSGST: any;
  getCGST: any;
  getHSN: any;
  infoItemId:any;
  images:any=[];
  getImageData:any;
  url=globalData.apiUrl
  hideImgId:any;
  delImgData:any;
  units: any = [
    { id: 'cm', value: 'cm' },
    { id: 'm', value: 'm' },
    { id: 'inch', value: 'inch' }
  ]
  constructor(private http:HttpClient,private router:Router, private _snackBar: MatSnackBar, private dataServe: DataService, private _formBuilder: FormBuilder, public appService: AppService, public formBuilder: FormBuilder, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.infoFormGroup = this._formBuilder.group({
      itemName: ['', Validators.required],
      cat_id: ['', Validators.required],
      subcat_id: ['', Validators.required],
      hsn_code: ['', Validators.required],
     
    });
    this.descFormGroup = this._formBuilder.group({
      p_type: ['', Validators.required],
      materials: ['', Validators.required],
      colors: ['', Validators.required],
      itemWeight: ['', Validators.required],
      itemHeight: ['', Validators.required],
      itemWidth: ['', Validators.required],
      unit: ['', Validators.required],
      // vendor: ['', Validators.required],
      history: [''],
      desc: ['']
    });
    this.imgFormGroup=this._formBuilder.group({
      images:['']
    })
    this.priceFormGroup = this._formBuilder.group({
      cp: ['', Validators.required],
      sp: ['', Validators.required],
      dis: ['', Validators.required],
      op: [''],
      sgst: ['', Validators.required],
      cgst: ['', Validators.required],
    });
    this.form = this.formBuilder.group({
      'name': [null, Validators.compose([Validators.required, Validators.minLength(4)])],
      'images': null,
      "oldPrice": null,
      "newPrice": [null, Validators.required],
      "discount": null,
      "description": null,
      "availibilityCount": null,
      "color": null,
      "size": null,
      "weight": null,
      "categoryId": [null, Validators.required]
    });
    this.getCategories();
    this.getMaterials();
    this.getColors();
    this.getTypes()
    this.sub = this.activatedRoute.params.subscribe(params => {
      if (params['id']) {
        this.id = params['id'];
        this.isLinear = this.id ? false : true;
        this.getProductsById(this.id);
        // this.getProductById();

      }
    
    });
  }
  public getProductsById(p_id: any) {
    this.dataServe.adminGetAllProductsById(p_id).subscribe(data => {
      console.log(data)
      this.getProductData = data;
      this.getProductData_copy = data;
      this.getProductData = this.getProductData.msg[0];
      this.getProductData_copy =this.id>0? this.getProductData_copy.msg[1]:null;
      this.getCat = this.getProductData.cat_id;
      this.getSub = this.getProductData.sub_cat_id;
      this.prodName = this.getProductData.prod_name;
      this.getProdType = this.getProductData.prod_type_id;
      this.getProdCol = this.getProductData.prod_color_id;
      this.getProdMat = this.getProductData.prod_material_id;
      this.getWeight = this.getProductData.prod_weight;
      this.getHeight = this.getProductData.prod_height;
      this.getWidth = this.getProductData.prod_width;
      this.getU = this.getProductData.dimention_unit;
      this.getHistory = this.getProductData.prod_history;
      // this.getVendor = this.getProductData.prod_vendor;
      this.getDesc = this.getProductData.prod_desc;
      console.log(this.getHistory + " " + this.getDesc + " " + this.getVendor)
      this.getCp = this.getProductData.prod_cp;
      this.getSp = this.getProductData.prod_sp;
      this.getOp = this.getProductData.offer_price;
      this.getDis = this.getProductData.discount;
      this.getCGST = this.getProductData.cgst;
      this.getSGST = this.getProductData.sgst;
      this.getHSN = this.getProductData.hsn_code;      
      this.getImageData=this.getProductData_copy ? this.getProductData_copy.img : [];
      this.getSubs(this.getProductData.cat_id);
      this.getCol(this.getProdCol);
      this.getMat(this.getProdMat);
      this.getUnit(this.getU);
      this.getType(this.getProdType)
      console.log(this.adminSubs);
      this.infoFormGroup.patchValue({
        "itemName": this.prodName,
        "cat_id":this.getCat,
        "subcat_id":this.getSub,
        "hsn_code":this.getHSN
      })
      this.descFormGroup.patchValue({
        "p_type": this.getProdType,
        "materials": this.getProdMat,
        "colors": this.getProdCol,
        "itemWeight":  this.getWeight,
        "itemHeight":this.getHeight,
        "itemWidth":  this.getWidth,
        "unit":this.getU,
        // "vendor":this.getVendor,
        "history":this.getHistory,
        "desc":  this.getDesc
      })
      this.priceFormGroup.patchValue({
        "cp": this.getCp,
        "sp": this.getSp,
        "dis":this.getDis,
        "op":this.getOp,
        "sgst":this.getSGST,
        "cgst":this.getCGST,
      });

    })
  }
  public getColors() {

    this.dataServe.adminGetColors().subscribe(data => {
      this.adminColors = data
      this.adminColors = this.adminColors.msg
      console.log(this.adminColors)
    })
  }
  public getMaterials() {

    this.dataServe.adminGetMaterials().subscribe(data => {
      this.adminMaterials = data
      this.adminMaterials = this.adminMaterials.msg
      console.log(this.adminMaterials)
    })
  }
  public getCategories() {
    this.dataServe.adminGetCategories().subscribe(data => {
      this.adminCategories = data;
      this.adminCategories = this.adminCategories.msg;
    });
  }
  public getTypes() {
    //for fetching admin categories
    this.dataServe.adminGetProducts().subscribe(data => {
      this.adminTypes = data
      this.adminTypes = this.adminTypes.msg
      console.log(this.adminTypes)
    })
  }
  // public getProductById() {
  //   this.appService.getProductById(this.id).subscribe((data: any) => {
  //     this.form.patchValue(data);
  //     this.selectedColors = data.color;
  //     const images: any[] = [];
  //     data.images.forEach(item => {
  //       let image = {
  //         link: item.medium,
  //         preview: item.medium
  //       }
  //       images.push(image);
  //     })
  //     this.form.controls.images.setValue(images);
  //   });
  // }

  public onSubmit() {
    console.log(this.form.value);
  }

  public onColorSelectionChange(event: any) {
    if (event.value) {
      this.selectedColors = event.value.join();
    }
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getSubs(v: any) {
    this.catval = v;
    this.infoFormGroup.value.cat_id = this.catval
    this.dataServe.adminGetSubcategoriesbyCat_id(v).subscribe(data => {
      this.adminSubs = data
      this.adminSubs = this.adminSubs.msg
      console.log(this.adminSubs)
    })
  }
  getSubCat(v: any) {
    this.subcatval = v;
    this.infoFormGroup.value.subcat_id = this.subcatval;
  }
  getType(v: any) {
    this.ptype = v;
    this.descFormGroup.value.p_type = this.ptype;
  }
  getMat(v: any) {
    this.material = v;
    this.descFormGroup.value.materials = this.material
  }
  getCol(v: any) {
    this.color = v;
    this.descFormGroup.value.colors = v;
  }
  getUnit(v: any) {
    this.unitval = v;
    this.descFormGroup.value.unit = v;
  }
  submitInfo() {
    console.log({"itemName":this.infoFormGroup.get('itemName').value,'cat_id':this.infoFormGroup.get('cat_id').value,'subcat_id':this.infoFormGroup.get('subcat_id').value})
  }
  submitDesc() {
    console.log(this.descFormGroup.value)
  }
  submitPrice(){
    console.log(this.priceFormGroup.value)

  }
  submitImage(){
    console.log(this.imgFormGroup.value)
  }
  submitData() {
    console.log(this.infoFormGroup.value);
    console.log(this.descFormGroup.value);
    console.log(this.priceFormGroup.value);
    console.log(this.imgFormGroup.value)
    var info_dt = {
      id: this.id?this.id:0,
      cat_id: this.infoFormGroup.value.cat_id,
      sub_cat_id: this.infoFormGroup.value.subcat_id,
      prod_name: this.infoFormGroup.value.itemName,
      offer_price:this.infoFormGroup.value.op,
      hsn_code:this.infoFormGroup.value.hsn_code,
      user: this.user
    }
if(this.id){
    this.dataServe.adminPostInfo(info_dt).subscribe(data => {
      console.log(data);
      this.submitInfoData = data;
      if (this.submitInfoData.suc == 1) {
        var desc_dt = {
          id: this.id?this.id:0,
          item_id: this.submitInfoData.item_id,
          prod_type_id: this.descFormGroup.value.p_type,
          prod_color_id: this.descFormGroup.value.colors,
          prod_material_id: this.descFormGroup.value.materials,
          prod_height: this.descFormGroup.value.itemHeight,
          prod_width: this.descFormGroup.value.itemWidth,
          dimention_unit: this.descFormGroup.value.unit,
          prod_weight: this.descFormGroup.value.itemWeight,
          // prod_vendor: this.descFormGroup.value.vendor,
          prod_history: this.descFormGroup.value.history,
          prod_desc: this.descFormGroup.value.desc,
          user: this.user
        }
        var price_dt = {
          id: this.id?this.id:0,
          item_id: this.submitInfoData.item_id,
          prod_cp: this.priceFormGroup.value.cp,
          prod_sp: this.priceFormGroup.value.sp,
          discount: this.priceFormGroup.value.dis,
          offer_price:this.priceFormGroup.value.op,
          // offer_price: this.offer_price,
          sgst: this.priceFormGroup.value.sgst,
          cgst: this.priceFormGroup.value.cgst,
          user: this.user
        }
        this.dataServe.adminPostDesc(desc_dt).subscribe(data => {
          console.log(data)
        })

        this.dataServe.adminPostPrice(price_dt).subscribe(data => {
          console.log(data);
          this.submitConfirmData = data;
          // if (this.submitConfirmData.suc == 1) {
          //   // this.stepperVal = document.getElementById('resetStep');
          //   // this.stepperVal.click();
          //   this.openSnackBar(this.submitConfirmData.msg, 'Redirecting...');
          // }
        })
        var imgDt={
          prod_name: this.infoFormGroup.value.itemName,
          img:this.imgFormGroup.value
        }
         for(let i=0;i<this.imgFormGroup.value.images.length;i++){
           this.images[i]=this.imgFormGroup.value.images[i].file;
         }
         this.dataServe.adminPostImages(imgDt.prod_name,this.images,this.id,this.user).subscribe(data=>{
          console.log(data)
            this.submitImgData=data;
            if (this.submitImgData.suc == 1) {
              // this.stepperVal = document.getElementById('resetStep');
              // this.stepperVal.click();
              this.openSnackBar(this.submitImgData.msg, 'Redirecting...');
            }
        })
      }
    })
  }
  else{
    this.dataServe.adminPostInfo(info_dt).subscribe(data => {
      console.log(data);
      this.submitInfoData = data;
      this.infoItemId=this.submitInfoData.item_id;
    
        var desc_dt = {
          id: this.id?this.id:0,
          item_id: this.infoItemId,
          prod_type_id: this.descFormGroup.value.p_type,
          prod_color_id: this.descFormGroup.value.colors,
          prod_material_id: this.descFormGroup.value.materials,
          prod_height: this.descFormGroup.value.itemHeight,
          prod_width: this.descFormGroup.value.itemWidth,
          dimention_unit: this.descFormGroup.value.unit,
          prod_weight: this.descFormGroup.value.itemWeight,
          // prod_vendor: this.descFormGroup.value.vendor,
          prod_history: this.descFormGroup.value.history,
          prod_desc: this.descFormGroup.value.desc,
          user: this.user
        }
      
        var price_dt = {
          id: this.id?this.id:0,
          item_id: this.infoItemId,
          prod_cp: this.priceFormGroup.value.cp,
          prod_sp: this.priceFormGroup.value.sp,
          discount: this.priceFormGroup.value.dis,
          // offer_price:this.priceFormGroup.value.op,
          offer_price: this.offer_price,
          sgst: this.priceFormGroup.value.sgst,
          cgst: this.priceFormGroup.value.cgst,
          user: this.user
        }
        var imgDt={
          prod_name: this.infoFormGroup.value.itemName,
          img:this.imgFormGroup.value
        }
         for(let i=0;i<this.imgFormGroup.value.images.length;i++){
           this.images[i]=this.imgFormGroup.value.images[i].file;
         }
        this.dataServe.adminPostDesc(desc_dt).subscribe(data => {
          console.log(data)
        })
        this.dataServe.adminPostPrice(price_dt).subscribe(data => {
          console.log(data);
          this.submitConfirmData = data;
         
       
      })
     
      this.dataServe.adminPostImages(imgDt.prod_name,this.images,this.infoItemId,this.user).subscribe(data=>{
        console.log(data)
          this.submitImgData=data;
          if (this.submitImgData.suc == 1) {
            // this.stepperVal = document.getElementById('resetStep');
            // this.stepperVal.click();
            this.openSnackBar(this.submitImgData.msg, 'Redirecting...');
          }
      })
    })
  }
  
  }
  calc_dis(e: any) {
    this.sell_price = document.getElementById('sell_price');
    this.discount_val = e.target.value;
    this.offer_price = Number(this.sell_price.value) - Number(this.sell_price.value * (this.discount_val / 100));
    this.priceFormGroup.value.op = this.offer_price
    console.log(this.offer_price);
    this.priceFormGroup.patchValue({"op":this.offer_price});    // this.offer_price=Number(this.offer_price)

  }
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);

    setTimeout(() => {
      this._snackBar.dismiss();
      this.router.navigate(['/admin/products/product-list'])
     
    }, 2500)
  }
  show() {
    alert('eii');
  }
  delete_img(id:any,path:any){
    console.log(id);
    console.log(path)
   this.dataServe.adminDelPrevImg(id,path).subscribe(data=>{console.log(data)
    this.delImgData=data
    if(this.delImgData.suc==1){
     this.hideImgId=document.getElementById('img_'+id)
     this.hideImgId.remove();
    }
  })
  }
}

