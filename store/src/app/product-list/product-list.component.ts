import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { MatPaginator } from '@angular/material/paginator';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  products: any = [];
  pageNumber: number;
  limit: number;
  count: any;
  @ViewChild('paginator') paginator: MatPaginator;
  constructor(
    private product: ProductService,
    private category: CategoryService,
    private route: ActivatedRoute,
    private detector: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.pageNumber = 0;
    this.limit = 10;
    this.getProducts();
  }
  prev(){
    this.pageNumber--;
    this.getProducts();
  }
  next(){
    this.pageNumber++;
    this.getProducts();
    console.log(this.pageNumber * this.limit)
  }
  getProducts() {
    const { pageNumber, limit } = this;
    this
      .product
      .get({ pageNumber, limit })
      .then((data: any) => {
        if (data && Array.isArray(data.data.products)) {
          this.products = data.data.products;
          this.count = data.data.count;
          this.detector.detectChanges();
        }
      })
      .catch(error => {
        alert(`couldn't fetch info: ${error && error.error && error.error.message}`);
      });
  }
  onPageChanged(){
    this.pageNumber = this.paginator.pageIndex;
    this.limit = this.paginator.pageSize;
    this.getProducts();
  }
  deleteProduct(_id){
    console.log({_id});

    this.product.delete({_id}).then(() => this.getProducts())
  }
  deleteCategory(_id){
    this.category.delete({_id}).then(() => this.getProducts())
  }

}
