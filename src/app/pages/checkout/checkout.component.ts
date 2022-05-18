import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ConstantPool } from '@angular/compiler';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { id } from '@swimlane/ngx-charts';
import { DataService } from 'src/app/data.service';
import { globalData } from 'src/app/globalVar';
import { Data, AppService } from '../../app.service';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  options = {
    "key": "rzp_test_gzbFg6wah8kBqZ", // Enter the Key ID generated from the Dashboard
    "amount": 0, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    "currency": "INR",
    "name": '',
    "description": "",
    "image": "",
    "order_id": "", //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler":
      // this.paymentHandler.bind(this),
      function (response: any) {
        var event = new CustomEvent("payment.success",
          {
            detail: response,
            bubbles: true,
            cancelable: true
          });
        window.dispatchEvent(event);
      }
    ,

    "prefill": {
      "name": "Somnath Thakur",
      "email": "somnath.thakur16@gmail.com",
      "contact": "9836751294"
    },
    "notes": {
      "address": "Razorpay Corporate Office"
    },
    "theme": {
      "color": "#3399cc"
    }
  };

  @ViewChild('horizontalStepper', { static: true }) horizontalStepper: MatStepper;
  @ViewChild('verticalStepper', { static: true }) verticalStepper: MatStepper;
  billingForm: FormGroup;
  deliveryForm: FormGroup;
  paymentForm: FormGroup;
  countries: any;
  transData: any
  editable = false;
  months = [];
  years = [];
  deliveryMethods = [];
  grandTotal = 0;
  billingData: any;
  url = globalData.apiUrl;
  deliveryCharge: any;
  userData: any = {};
  cname: any
  paymentConfData: any;
  heading: any;
  title: any;
  suc: any;
  constructor(private router:Router, public dialog: MatDialog, private http: HttpClient, public appService: AppService, public formBuilder: FormBuilder, private dataServe: DataService) { }

  ngOnInit() {
    this.appService.Data.cartList.forEach((product: any) => {
      this.grandTotal += product.cartCount * product.offer_price;
    });
    this.countries = this.dataServe.getCountries().subscribe(data => {
      console.log(data)
      this.countries = data;
      this.countries = this.countries.msg

    });
    this.months = this.appService.getMonths();
    this.years = this.appService.getYears();
    this.deliveryMethods = this.appService.getDeliveryMethods();
    this.billingForm = this.formBuilder.group({
      custName: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      state: '',
      zip: ['', Validators.required],
      address: ['', Validators.required],
      id: [localStorage.getItem('isLoggedIn') == 'true' ? localStorage.getItem('userId') : 0]
    });
    this.deliveryForm = this.formBuilder.group({
      deliveryMethod: [this.deliveryMethods[0], Validators.required],
    });
    this.paymentForm = this.formBuilder.group({
      cardHolderName: ['', Validators.required],
      cardNumber: ['', Validators.required],
      expiredMonth: ['', Validators.required],
      expiredYear: ['', Validators.required],
      cvv: ['', Validators.required]
    });
    if (localStorage.getItem('isLoggedIn') == 'true') {
      this.dataServe.getUserDetails(localStorage.getItem('userId')).subscribe(data => {
        this.userData = data;
        this.userData = this.userData.msg[0]
        this.billingForm.patchValue({
          custName: this.userData.name,
          email: this.userData.email,
          phone: this.userData.phone_no,
          country: this.userData.country_id,
          city: this.userData.city,
          state: this.userData.state,
          zip: this.userData.zip_code,
          address: this.userData.address,

        })

        for (let i = 0; i < this.countries.length; i++) {
          if (this.userData.country_id == this.countries[i].id)
            this.cname = this.countries[i].name
        }
        console.log(this.billingForm.value.country)
      })

    }
    // this.grandTotal+=Number(this.deliveryForm.controls.deliveryMethod.value['price'])

  }

  public placeOrder() {
    // console.log(this.grandTotal);
    // console.log(this.appService.Data.cartList)
    // console.log(this.billingData.res.insertId);
    // console.log(this.deliveryForm.value.deliveryMethod)
    for (let i = 0; i < this.deliveryMethods.length; i++) {
      if (this.deliveryMethods[i].value == this.deliveryForm.value.deliveryMethod.value) {
        //  console.log("price"+this.deliveryMethods[i].price);
        this.deliveryCharge = this.deliveryMethods[i].price

      }
    }

    // this.horizontalStepper._steps.forEach(step => step.editable = false);
    // this.verticalStepper._steps.forEach(step => step.editable = false);
    // this.appService.Data.cartList.length = 0;    
    // this.appService.Data.totalPrice = 0;
    // this.appService.Data.totalCartCount = 0;
    var dt = {
      "amount": this.grandTotal * 100,
      "currency": "INR",
      "receipt": "receipt#1",
      "notes": {
        "key1": "value3",
        "key2": "value2"
      }

    }

    this.http.post<any>('/v1/orders', dt).subscribe(data => {
      var order_id = data;
      this.options.order_id = order_id.id;
      this.options.amount = order_id.amount;
      this.options.name = this.paymentForm.value.cardHolderName;
      this.options.prefill.name = this.paymentForm.value.cardHolderName;
      this.options.prefill.email = this.billingForm.value.email;
      this.options.prefill.contact = this.billingForm.value.phone;
      var rzp1 = new this.dataServe.nativeWindow.Razorpay(this.options);
      rzp1.open();
      rzp1.on('payment.failed', function (response: any) {
        console.log(response.error.code);
        console.log(response.error.description);
        console.log(response.error.source);
        console.log(response.error.step);
        console.log(response.error.reason);
        console.log(response.error.metadata.order_id);
        console.log(response.error.metadata.payment_id);
      });
    })
  }
  submitBillingForm() {
    console.log(this.billingForm.value)
    if (this.editable)
      this.dataServe.postBillingData(this.billingForm.value).subscribe(data => {
        console.log(data)
        this.billingData = data;

      })
  }
  getCode(e: any) {
    console.log(e)
    this.billingForm.value.country = e.value;
    this.cname = e.source.triggerValue

  }
  showDelMethod() {
    this.grandTotal += this.deliveryForm.controls.deliveryMethod.value['price']
  }
  submitProdDetails() {
    console.log(this.appService.Data.cartList)
    console.log(this.billingData.res.insertId);
    console.log(this.deliveryForm.value.deliveryMethod)
    for (let i = 0; i < this.deliveryMethods.length; i++) {
      if (this.deliveryMethods[i].value == this.deliveryForm.value.deliveryMethod.value) {
        //  console.log("price"+this.deliveryMethods[i].price);
        this.deliveryCharge = this.deliveryMethods[i].price

      }
    }
    //   var dt= {
    //     "user_id": localStorage.getItem('isLoggedIn')=='true'?localStorage.getItem('userId'):this.billingData.res.insertId,
    //     "prod_list":this.appService.Data.cartList,
    //     "flag": "-1",
    //     "user": "subham@gmail.com",
    //     "delivery_charge": this.deliveryCharge
    // }
    //    this.dataServe.postCheckout(dt).subscribe(data=>{console.log(data)})
  }
  editInfo() {
    this.editable = true
  }
  @HostListener('window:payment.success', ['$event'])
  onPaymentSuccess(event: any): void {
    console.log('Success', event.detail.razorpay_payment_id);
    this.http.get('/v1/payments/' + event.detail.razorpay_payment_id).subscribe(dat => {
      this.transData = dat
      console.log(dat)
      var dt = {
        "user_id": localStorage.getItem('isLoggedIn') == 'true' ? localStorage.getItem('userId') : this.billingData.res.insertId,
        "prod_list": this.appService.Data.cartList,
        "flag": "-1",
        "user": "subham@gmail.com",
        "delivery_charge": this.deliveryCharge,
        "trans_no": this.transData.id
      }
      var payDt = {
        id: this.transData.id,
        bank_transaction_id: this.transData.acquirer_data[this.transData.method + '_transaction_id'],
        amount: this.transData.amount,
        bank: this.transData.bank,
        contact: this.transData.contact,
        created_at: this.transData.created_at,
        currency: this.transData.currency,
        description: this.transData.description,
        entity: this.transData.entity,
        method: this.transData.method,
        order_id: this.transData.order_id,
        refund_status: this.transData.refund_status,
        status: this.transData.status,
        delivery_charge: this.deliveryCharge,
        user_email: localStorage.getItem('userEmail')

      }
      this.dataServe.postTrans(payDt).subscribe(data => {
        console.log(data);

        this.dataServe.postCheckout(dt).subscribe(dat => {
          console.log(dat)
          this.paymentConfData = dat;
          this.suc = this.paymentConfData.suc
          if (this.paymentConfData.suc == 1) {
            this.heading = 'Congratulations!'
            this.title = 'Your payment of Rs ' + this.grandTotal + ' was successful!!'
            this.openDialog()
          }
          else {
            this.heading = 'Uh-Oh!'
            this.title = 'There seems to be a problem! Please try again some time later.'
            this.openDialog()
          }

        })

      })


    })
  }
  openDialog() {
    const dialogRef = this.dialog.open(CheckoutDialogComponent, {
      data: {
        suc: this.suc,
        heading: this.heading,
        title: this.title,


      },
      panelClass: ['theme-dialog'],
      autoFocus: false,

    })
    

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      if(this.suc==1)
      this.router.navigate(['/'])
 
   
    });
  }

}
