import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';
import { AppRouterModule } from './app-router.module';
import { AngularMaterialModule } from './angularMaterial.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { BlogsComponent } from './blogs/blogs.component';
import { BlogsListComponent } from './blogs-list/blogs-list.component';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';


@NgModule({
  declarations: [
    AppComponent,
    PostsComponentComponent,
    AllPostsComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    BlogsComponent,
    BlogsListComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRouterModule,
    AngularMaterialModule,
    FormsModule,
    BsDropdownModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
