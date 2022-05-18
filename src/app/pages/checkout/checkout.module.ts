import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { CheckoutComponent } from './checkout.component';
import { CheckoutDialogComponent } from './checkout-dialog/checkout-dialog.component';

export const routes = [
  { path: '', component: CheckoutComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    CheckoutComponent,
    CheckoutDialogComponent
  ]
})
export class CheckoutModule { }
