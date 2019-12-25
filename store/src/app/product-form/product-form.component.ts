import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ProductService } from '../services/product.service';
import { ActivatedRoute } from '@angular/router';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(''),
    productId: new FormControl(''),
    _id: new FormControl(''),
    _categoryId: new FormControl('')
  });
  categories: any = [];
  constructor(private product: ProductService, private category: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('productId');
    console.log({_id});

    if (_id) {
      this
        .product
        .get({ _id, pageNumber: 0, limit: 1 })
        .then((data: any) => {
          if (data && data.data.products && data.data.products.length) {
            const formData = {...data.data.products[0] };
            formData._categoryId = formData._categoryId._id;
            this.form.patchValue(formData);
          }
          return this
              .category
              .get({ pageNumber: 0, limit: 0 })
        })
        .then((data: any) => {
          if (data && data.data.length && data.data.length) {
            let {_categoryId} = this.form.value;
            this.categories = data.data.filter(cat => _id ? ((_categoryId === cat._id) || cat.isActive) : cat.isActive);
          }
        })
        .catch(error => {
          alert(`couldn't fetch info: ${error && error.error && error.error.message}`);
        });
    }

  }
  onSubmit() {
    const id = this.form.value._id;
    if (id) {
      this.product.update(this.form.value);
      return;
    }
    this.product.insert(this.form.value);
  }
}
