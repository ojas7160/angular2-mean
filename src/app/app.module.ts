import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';
import { AppRouterModule } from './app-router.module';
import { AllPostsComponent } from './all-posts/all-posts.component';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponentComponent,
    AllPostsComponent
  ],
  imports: [
    BrowserModule,
    AppRouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
