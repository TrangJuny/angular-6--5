import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';
import { AppRoutingModule } from "./app-routing.module";
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ProjectComponent } from "./components/project/project.component";
import { NewsComponent } from "./components/news/news.component";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  imports: [
      BrowserModule, AppRoutingModule, HttpModule,NgbModule.forRoot()
  ],
  declarations: [
      AppComponent, DashboardComponent, ProjectComponent,NewsComponent
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
