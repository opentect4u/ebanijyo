import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserBannerComponent } from './user-banner/user-banner.component';
import { RouterModule } from '@angular/router'; 
import { ReactiveFormsModule } from '@angular/forms';
// import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatSelectModule} from '@angular/material/select';
export const routes = [
  { path: '', component: UserBannerComponent, pathMatch: 'full' }
];
@NgModule({
  declarations: [
    UserBannerComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSelectModule,
    // MatFormFieldModule,
    MatInputModule,MatFormFieldModule,
    MatExpansionModule,MatButtonModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    RouterModule.forChild(routes), 
  ],
  schemas:[CUSTOM_ELEMENTS_SCHEMA],
  exports:[
    MatInputModule,MatFormFieldModule,MatButtonModule,
    MatIconModule,MatSelectModule
  ]


})
export class UserbannerModule { }
