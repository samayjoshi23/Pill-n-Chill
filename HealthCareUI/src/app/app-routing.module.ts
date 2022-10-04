import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingPageComponent } from './Components/Admin/admin-landing-page/admin-landing-page.component';
import { AddCategoryComponent } from './Components/Admin/dash-board/Categories/add-category/add-category.component';
import { CategoryListComponent } from './Components/Admin/dash-board/Categories/category-list/category-list.component';
import { EditCategoryComponent } from './Components/Admin/dash-board/Categories/edit-category/edit-category.component';
import { DashBoardComponent } from './Components/Admin/dash-board/dash-board.component';
import { OrderListComponent } from './Components/Admin/dash-board/Orders/order-list/order-list.component';
import { AddProductComponent } from './Components/Admin/dash-board/Products/add-product/add-product.component';
import { EditProductComponent } from './Components/Admin/dash-board/Products/edit-product/edit-product.component';
import { ProductListComponent } from './Components/Admin/dash-board/Products/product-list/product-list.component';
import { UserListComponent } from './Components/Admin/dash-board/Users/user-list/user-list.component';
import { BillingPageComponent } from './Components/Client/billing-page/billing-page.component';
import { CheckoutPageComponent } from './Components/Client/checkout-page/checkout-page.component';
import { LandingPageComponent } from './Components/Client/landing-page/landing-page.component';
import { ListPageComponent } from './Components/Client/list-page/list-page.component';
import { ProductPageComponent } from './Components/Client/product-page/product-page.component';
import { LoginFormComponent } from './Components/Login/login-form.component';
import { RegisterFormComponent } from './Components/Signup/register-form.component';
import { ErrorPageComponent } from './Components/Utility/error-page/error-page.component';

const routes: Routes = [
  {
    title: "Pill 'n Chill - Home",
    path: '',
    component: LandingPageComponent,
  },
  {
    title: "Pill 'n Chill - Login",
    path: 'login',
    component: LoginFormComponent
  },
  {
    title: "Pill 'n Chill - Register",
    path: 'register',
    component: RegisterFormComponent
  },
  {
    title: "Pill 'n Chill - Products",
    path: 'products',
    component: ListPageComponent,
  },
  {
    path: 'products',
    children: [
      {
        title: "Pill 'n Chill - Billing",
        path: 'billing/:cardType',
        component: BillingPageComponent
      },
      {
        title: "Pill 'n Chill - Checkout",
        path: 'checkout/:id',
        component: CheckoutPageComponent
      },
      {
        path: ':type/:category',
        component: ListPageComponent
      },
      {
        path: ':type/:category',
        children: [
          {
            path: ':id',
            component: ProductPageComponent
          }
        ]
      },
    ]
  },

  // Admin Paths
  {
    title: 'PillnChill - Admin',
    path: 'admin',
    component: DashBoardComponent,
    children: [
      {
        path: 'dashboard',
        component: AdminLandingPageComponent,
      },
      {
        path:'users',
        component: UserListComponent
      },
      {
        path:'categories',
        component: CategoryListComponent
      },
      {
        path:'categories',
        children: [
          {
            path: 'add',
            component: AddCategoryComponent
          },
          {
            path: ':id',
            component: EditCategoryComponent
          }
        ]
      },
      {
        path:'orders',
        component: OrderListComponent
      },
      {
        path:'products',
        component: ProductListComponent,
      },
      {
        path: 'products',
        children: [
          {
            path: 'add',
            component: AddProductComponent
          },
          {
            path: ':id',
            component: EditProductComponent
          }
        ]
      }
    ],
  },
  {
    path: '**',
    component: ErrorPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
