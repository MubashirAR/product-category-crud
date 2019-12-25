import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) { }
  get(data) {
    return this
      .http
      .get('http://localhost:3000/category', { params: data })
      .toPromise();
  }
  insert(data) {
    this
      .http
      .post('http://localhost:3000/category', data)
      .toPromise()
      .then(data => {
        alert('data inserted successfully!');
      })
      .catch(error => {
        alert(`error while submitting: ${error && error.error && error.error.message || ''}`);
      });
  }
  update(data) {
    this
      .http
      .put('http://localhost:3000/category', data)
      .toPromise()
      .then(data => {
        alert('data updated successfully!');
      })
      .catch(error => {
        alert(`error while submitting: ${error && error.error && error.error.message || ''}`);
      });
  }
  delete(data) {
    return this
      .http
      .delete('http://localhost:3000/category', {params: data})
      .toPromise()
  }
}
