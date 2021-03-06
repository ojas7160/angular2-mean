import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponentComponent} from './posts-component/posts-component.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { BootstrapThemeComponent } from './bootstrap-theme/bootstrap-theme.component';
import { BlogsComponent } from './blogs-folder/blogs/blogs.component';
import { BlogsListComponent } from './blogs-folder/blogs-list/blogs-list.component';
import { BlogReactiveFormComponent } from './blog-reactive-form/blog-reactive-form.component';
import { AuthGuard } from './auth.guard';


// Routes are simple javascript object where we define to which url for which part of our app should be presented
const routes: Routes = [
{path: 'post', component: PostsComponentComponent},
{path: '', component: BootstrapThemeComponent},
{path: 'posts', component: AllPostsComponent},
{path: 'login', component: LoginComponent},
{path: 'signup', component: SignupComponent},
{path: 'blog-create', component: BlogsComponent, canActivate: [AuthGuard]},
{path: 'blogs', component: BlogsListComponent},
{path: 'blogs/:blogId/edit', component: BlogsComponent, canActivate: [AuthGuard]},
{path: 'blog-new', component: BlogReactiveFormComponent, canActivate: [AuthGuard]}
];
@NgModule({
// tslint:disable-next-line:indent
	imports: [RouterModule.forRoot(routes)],
// tslint:disable-next-line:indent
	exports: [RouterModule],
// tslint:disable-next-line:indent
	providers: [AuthGuard]
})
export class AppRouterModule {
}
