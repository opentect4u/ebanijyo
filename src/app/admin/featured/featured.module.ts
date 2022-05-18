import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; 
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { SharedModule } from '../../shared/shared.module'
import { FeaturedComponent } from './featured/featured.component';

export const routes = [
  { path: '', component: FeaturedComponent, pathMatch: 'full' }
];


@NgModule({
  declarations: [
    FeaturedComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class FeaturedModule { }
