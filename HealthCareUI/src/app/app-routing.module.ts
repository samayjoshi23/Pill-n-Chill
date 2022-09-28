import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLandingPageComponent } from './Admin/admin-landing-page/admin-landing-page.component';
import { AddCategoryComponent } from './Admin/dash-board/Categories/add-category/add-category.component';
import { CategoryListComponent } from './Admin/dash-board/Categories/category-list/category-list.component';
import { EditCategoryComponent } from './Admin/dash-board/Categories/edit-category/edit-category.component';
import { DashBoardComponent } from './Admin/dash-board/dash-board.component';
import { OrderListComponent } from './Admin/dash-board/Orders/order-list/order-list.component';
import { AddProductComponent } from './Admin/dash-board/Products/add-product/add-product.component';
import { EditProductComponent } from './Admin/dash-board/Products/edit-product/edit-product.component';
import { ProductListComponent } from './Admin/dash-board/Products/product-list/product-list.component';
import { UserListComponent } from './Admin/dash-board/Users/user-list/user-list.component';
import { LandingPageComponent } from './Client/landing-page/landing-page.component';
import { ListPageComponent } from './Client/list-page/list-page.component';
import { ProductPageComponent } from './Client/product-page/product-page.component';
import { ErrorPageComponent } from './Utility/error-page/error-page.component';

const routes: Routes = [
  {
    path: '',
    component: LandingPageComponent,
  },
  {
    path: 'products',
    component: ListPageComponent,
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
