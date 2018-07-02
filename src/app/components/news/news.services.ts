import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { News } from './news.interface';

@Injectable()
export class NewsServices {
  newsArray = [
    new News(101, 'New 1'),
    new News(102, 'New 2'),
    new News(103, 'New 3'),
    new News(104, 'New 4')
  ];
  getAllNews(): Observable<News[]> {
    return Observable.of(this.newsArray);
  }
  add(description: string) {
    let maxIndex = this.newsArray.length - 1;
    let objWithMaxIndex = this.newsArray[maxIndex];
    let newId = objWithMaxIndex.newId + 1;
    this.newsArray.push(new News(newId, description));
  }
  remove(newRemoveId: number) {
    let obj = this.newsArray.find(ob => ob.newId === newRemoveId);
    this.newsArray.splice(this.newsArray.indexOf(obj), 1);
  }
} 