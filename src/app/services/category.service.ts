import { Injectable } from '@angular/core';
import { Category } from '../models/category.model';
import { Subject } from 'rxjs'
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class CategoryService {
    categories: Category[] = []
    categoryListChangedEvent = new Subject<Category[]>()

    constructor(private http: HttpClient) { }

    getCategories() {
        this.http.get<Category[]>('http://localhost:3000/categories').subscribe(
            // success method
            (cat: Category[]) => {
                this.categories = cat
                this.categories.sort((a, b) => {
                    if (a.id > b.id) {
                        return 1;
                    }
                    if (b.id > a.id) {
                        return -1;
                    }
                    return 0;
                })
                this.categoryListChangedEvent.next(this.categories.slice());
            }, (error: any) => {
                console.log(error);
            })
    }

}