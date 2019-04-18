import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostsComponentComponent } from './posts-component/posts-component.component';
import { AppRouterModule } from './app-router.module';
import { AngularMaterialModule } from './angularMaterial.module';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { HeaderComponent } from './header/header.component';
import { BlogsComponent } from './blogs-folder/blogs/blogs.component';
import { BlogsListComponent } from './blogs-folder/blogs-list/blogs-list.component';

// import { BsDropdownModule } from 'ngx-bootstrap/dropdown/ngx-bootstrap-dropdown';
import { NgxPaginationModule } from 'ngx-pagination';
// import { TooltipModule } from 'ngx-bootstrap/tooltip/ngx-bootstrap-tooltip';
// import { ModalModule } from 'ngx-bootstrap/modal/ngx-bootstrap-modal';
import { BootstrapThemeComponent } from './bootstrap-theme/bootstrap-theme.component';
import { BlogReactiveFormComponent } from './blog-reactive-form/blog-reactive-form.component';
import { AuthInterceptor } from './authInterceptor';
import { ErrorInterceptor } from './error-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PostsComponentComponent,
    AllPostsComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    BlogsComponent,
    BlogsListComponent,
    BootstrapThemeComponent,
    BlogReactiveFormComponent
  ],
  imports: [
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRouterModule,
    AngularMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    // BsDropdownModule.forRoot(),
    // TooltipModule.forRoot(),
    // ModalModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
