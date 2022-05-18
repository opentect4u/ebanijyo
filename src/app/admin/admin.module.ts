import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

import { InputFileConfig, InputFileModule } from 'ngx-input-file';
const config: InputFileConfig = {
  fileAccept: '*'
};

import { AdminComponent } from './admin.component';
import { MenuComponent } from './components/menu/menu.component';
import { UserMenuComponent } from './components/user-menu/user-menu.component';
import { FullScreenComponent } from './components/fullscreen/fullscreen.component'; 
import { MessagesComponent } from './components/messages/messages.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { UserbannerModule } from './userbanner/userbanner.module';
// import { UserBannerComponent } from './userbanner/userbanner.module';
import {MatSelectModule} from '@angular/material/select';


export const routes = [ 
  { 
    path: '', 
    component: AdminComponent, children: [
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) }, 
      { path: 'products', loadChildren: () => import('./products/products.module').then(m => m.ProductsModule) },
      { path: 'sales', loadChildren: () => import('./sales/sales.module').then(m => m.SalesModule) },
      { path: 'users', loadChildren: () => import('./users/users.module').then(m => m.UsersModule), data: { breadcrumb: 'Users' } },
      { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule), data: { breadcrumb: 'Customers' } },
      { path: 'coupons', loadChildren: () => import('./coupons/coupons.module').then(m => m.CouponsModule), data: { breadcrumb: 'Coupons' } },
      { path: 'withdrawal', loadChildren: () => import('./withdrawal/withdrawal.module').then(m => m.WithdrawalModule), data: { breadcrumb: 'Withdrawal' } },
      { path: 'analytics', loadChildren: () => import('./analytics/analytics.module').then(m => m.AnalyticsModule), data: { breadcrumb: 'Analytics' } },
      { path: 'refund', loadChildren: () => import('./refund/refund.module').then(m => m.RefundModule), data: { breadcrumb: 'Refund' } },
      { path: 'followers', loadChildren: () => import('./followers/followers.module').then(m => m.FollowersModule), data: { breadcrumb: 'Followers' } },
      { path: 'support', loadChildren: () => import('./support/support.module').then(m => m.SupportModule), data: { breadcrumb: 'Support' } },
      { path: 'reviews', loadChildren: () => import('./reviews/reviews.module').then(m => m.ReviewsModule), data: { breadcrumb: 'Reviews' } },
      { path: 'banners', loadChildren: () => import('./userbanner/userbanner.module').then(m => m.UserbannerModule), data: { breadcrumb: 'Banners' } },
      { path: 'featured', loadChildren: () => import('./featured/featured.module').then(m => m.FeaturedModule), data: { breadcrumb: 'Featured' } },
      { path: 'stock',loadChildren:()=>import('./item-stock/item-stock.module').then(m=>m.ItemStockModule),data:{breadcrumb:'Stock'}}
    ],
    
  } ,
 
];

@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    UserMenuComponent,
    FullScreenComponent,
    MessagesComponent,
    BreadcrumbComponent,
   
   
  ],
  imports: [

    CommonModule,
    UserbannerModule,
    RouterModule.forChild(routes),
    SharedModule,
    MatSelectModule,
    InputFileModule.forRoot(config),
  ]
})
export class AdminModule { }
