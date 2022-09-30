import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Utility/nav-bar/nav-bar.component';
import { LandingPageComponent } from './Client/landing-page/landing-page.component';
import { AdminLandingPageComponent } from './Admin/admin-landing-page/admin-landing-page.component';
import { DashBoardComponent } from './Admin/dash-board/dash-board.component';
import { AddCategoryComponent } from './Admin/dash-board/Categories/add-category/add-category.component';
import { CategoryListComponent } from './Admin/dash-board/Categories/category-list/category-list.component';
import { OrderListComponent } from './Admin/dash-board/Orders/order-list/order-list.component';
import { UserListComponent } from './Admin/dash-board/Users/user-list/user-list.component';
import { ProductListComponent } from './Admin/dash-board/Products/product-list/product-list.component';
import { EditProductComponent } from './Admin/dash-board/Products/edit-product/edit-product.component';
import { AddProductComponent } from './Admin/dash-board/Products/add-product/add-product.component';
import { EditCategoryComponent } from './Admin/dash-board/Categories/edit-category/edit-category.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { RegisterFormComponent } from './register-form/register-form.component';
import { CheckoutPageComponent } from './Client/checkout-page/checkout-page.component';
import { BillingPageComponent } from './Client/billing-page/billing-page.component';
import { ProductPageComponent } from './Client/product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    LandingPageComponent,
    AdminLandingPageComponent,
    DashBoardComponent,
    CategoryListComponent,
    OrderListComponent,
    UserListComponent,
    ProductListComponent,
    EditProductComponent,
    AddProductComponent,
    EditCategoryComponent,
    AddCategoryComponent,
    LoginFormComponent,
    RegisterFormComponent,
    CheckoutPageComponent,
    BillingPageComponent,
    ProductPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
