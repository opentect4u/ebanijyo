import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../../../app.service';
import { DataService } from 'src/app/data.service';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.scss']
})
export class AddressesComponent implements OnInit {
  billingForm: FormGroup;
  shippingForm: FormGroup;
  countries:any;
  changeAddressData:any;
  cid:any=localStorage.getItem('isLoggedIn') ? localStorage.getItem('userCountry') : ''
  constructor(private dataServe:DataService, public appService:AppService, public formBuilder: FormBuilder, public snackBar: MatSnackBar) { }

  ngOnInit() {
    
    this.countries = this.dataServe.getCountries().subscribe(data => {
      console.log(data)
      this.countries = data;
      this.countries = this.countries.msg
      console.log(this.countries);
      
    });
    // this.cid=localStorage.getItem('userCountry') ? localStorage.getItem('userCountry') : ''
    console.log(this.cid)
    this.billingForm = this.formBuilder.group({
      'custName': ['', Validators.required],
      'email': ['', Validators.required],
      'phone': ['', Validators.required],
      'country': [this.cid, Validators.required],
      'city': ['', Validators.required],
      'state': '',
      'zip': ['', Validators.required],
      'address': ['', Validators.required],
      'id':[localStorage.getItem('userId')]
    });
    // this.shippingForm = this.formBuilder.group({
    //   'firstName': ['', Validators.required],
    //   'lastName': ['', Validators.required],
    //   'middleName': '',
    //   'company': '',
    //   'email': ['', Validators.required],
    //   'phone': ['', Validators.required],
    //   'country': ['', Validators.required],
    //   'city': ['', Validators.required],
    //   'state': '',
    //   'zip': ['', Validators.required],
    //   'address': ['', Validators.required]
    // });
    // console.log(this.countries)
    if(localStorage.getItem('isLoggedIn')=='true'){
      this.billingForm.patchValue({
        'custName': localStorage.getItem('userName'),
        'email': localStorage.getItem('userEmail'),
        'phone': localStorage.getItem('userPhone'),
        'country':Number(localStorage.getItem('userCountry')),
        'city': localStorage.getItem('userCity'),
        'state': localStorage.getItem('userState'),
        'zip': localStorage.getItem('userZip'),
        'address': localStorage.getItem('userAddress'),
      }) 
    }
    this.billingForm.value.country = localStorage.getItem('userCountry');

  }
  ngAfterViewInit():void{
  
  }
  getCode(e: any) {
    console.log(e)
    this.billingForm.value.country = e.value;
    // this.cid = e.source.triggerValue

  }
  public onBillingFormSubmit(values:Object):void {
    if (this.billingForm.valid) {
      console.log(values)
      this.dataServe.postBillingData(values).subscribe(data=>{
        this.changeAddressData=data;
        if(this.changeAddressData.suc==1)
          this.snackBar.open('Your billing address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });

      })
    }
  }

  public onShippingFormSubmit(values:Object):void {
    if (this.shippingForm.valid) {
      this.snackBar.open('Your shipping address information updated successfully!', '×', { panelClass: 'success', verticalPosition: 'top', duration: 3000 });
    }
  }

}
