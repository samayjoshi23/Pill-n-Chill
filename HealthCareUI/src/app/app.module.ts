import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './Components/Utility/nav-bar/nav-bar.component';
import { LandingPageComponent } from './Components/Client/landing-page/landing-page.component';
import { AdminLandingPageComponent } from './Components/Admin/admin-landing-page/admin-landing-page.component';
import { DashBoardComponent } from './Components/Admin/dash-board/dash-board.component';
import { AddCategoryComponent } from './Components/Admin/dash-board/Categories/add-category/add-category.component';
import { CategoryListComponent } from './Components/Admin/dash-board/Categories/category-list/category-list.component';
import { OrderListComponent } from './Components/Admin/dash-board/Orders/order-list/order-list.component';
import { UserListComponent } from './Components/Admin/dash-board/Users/user-list/user-list.component';
import { ProductListComponent } from './Components/Admin/dash-board/Products/product-list/product-list.component';
import { EditProductComponent } from './Components/Admin/dash-board/Products/edit-product/edit-product.component';
import { AddProductComponent } from './Components/Admin/dash-board/Products/add-product/add-product.component';
import { EditCategoryComponent } from './Components/Admin/dash-board/Categories/edit-category/edit-category.component';
import { LoginFormComponent } from './Components/Login/login-form.component';
import { RegisterFormComponent } from './Components/Signup/register-form.component';
import { CheckoutPageComponent } from './Components/Client/checkout-page/checkout-page.component';
import { BillingPageComponent } from './Components/Client/billing-page/billing-page.component';
import { ProductPageComponent } from './Components/Client/product-page/product-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPageComponent } from './Components/Client/list-page/list-page.component';
import { HttpClientModule } from '@angular/common/http'
import { AccountPageComponent} from './Components/Client/account-page/account-page.component';
import { OrderPageComponent } from './Components/Client/order-page/order-page.component'

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
    ListPageComponent,
    AccountPageComponent,
    OrderPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
