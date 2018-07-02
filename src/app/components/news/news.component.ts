import { Component, OnInit } from '@angular/core';
import { Directive } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { NewsServices } from './news.services';
import { News } from './news.interface';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
  providers: [NewsServices],
})
export class NewsComponent implements OnInit {
  description: string;
  allNews: News[];
  obsPersons: Observable<News[]>;
  constructor(public newsServices: NewsServices) {

  }
  ngOnInit() {
    let heroes = [
      { id: 1, name: 'Superman' },
      { id: 2, name: 'Batman' },
      { id: 5, name: 'BatGirl' },
      { id: 3, name: 'Robin' },
      { id: 4, name: 'Flash' }
    ];
    this.newsServices.getAllNews()
      .subscribe(news => this.allNews = news);
    this.obsPersons = this.newsServices.getAllNews();
    this.addNewSlide();
  }
  add() {
    this.newsServices.add(this.description);
    this.description = 'thang trinh';
  }
  remove(newRemoveID: number) {
    this.newsServices.remove(newRemoveID);
  }

  //The time to show the next photo
  private NextPhotoInterval: number = 5000;
  //Looping or not
  private noLoopSlides: boolean = true;
  //Photos
  private slides: Array<any> = [];

  private addNewSlide() {
    this.slides.push(
      { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car1.jpg', text: 'BMW 1' },
      { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car2.jpg', text: 'BMW 2' },
      { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car3.jpg', text: 'BMW 3' },
      { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car4.jpg', text: 'BMW 4' },
      { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car5.jpg', text: 'BMW 5' },
      { image: 'http://www.angulartypescript.com/wp-content/uploads/2016/03/car6.jpg', text: 'BMW 6' }
    );
  }

  private removeLastSlide() {
    this.slides.pop();
  }

}
