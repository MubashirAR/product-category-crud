import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryFormComponent } from './category-form/category-form.component';
import { ProductFormComponent } from './product-form/product-form.component';
import { ProductListComponent } from './product-list/product-list.component';
const routes: Routes = [
  {
    path: 'category',
    children: [
      { path: '', redirectTo: 'add', pathMatch: 'full' },
      // { path: 'list', pathMatch: 'full' },
      { path: 'edit/:categoryId', pathMatch: 'full', component: CategoryFormComponent },
      { path: 'add', pathMatch: 'full', component: CategoryFormComponent },
    ]
  },
  {
    path: 'product',
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', pathMatch: 'full', component: ProductListComponent },
      { path: 'edit/:productId', pathMatch: 'full', component: ProductFormComponent },
      { path: 'add', pathMatch: 'full', component: ProductFormComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
