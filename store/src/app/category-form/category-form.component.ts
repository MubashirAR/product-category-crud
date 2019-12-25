import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { CategoryService } from '../services/category.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss']
})
export class CategoryFormComponent implements OnInit {

  form = new FormGroup({
    name: new FormControl(''),
    categoryId: new FormControl(''),
    _id: new FormControl('')
  });
  constructor(private category: CategoryService, private route: ActivatedRoute) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('categoryId');
    if (_id) {
      this
        .category
        .get({ _id, pageNumber: 0, limit: 1 })
        .then((data: any) => {
          if (data && data.data.length && data.data.length) {
            this.form.patchValue(data.data[0]);
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
      this.category.update(this.form.value);
      return;
    }
    this.category.insert(this.form.value);
  }

}
