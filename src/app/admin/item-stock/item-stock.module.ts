import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ItemStockComponent } from './item-stock/item-stock.component';
import { SharedModule } from '../../shared/shared.module'
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ItemStockDialogComponent } from './item-stock-dialog/item-stock-dialog.component';
const routes=[
  {path:'',component:ItemStockComponent, pathMatch:'full'}
]

@NgModule({
  declarations: [
    ItemStockComponent,
    ItemStockDialogComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule,
    NgxPaginationModule
  ]
})
export class ItemStockModule { }
