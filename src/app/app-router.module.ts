import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PostsComponentComponent} from './posts-component/posts-component.component';
import { AllPostsComponent } from './all-posts/all-posts.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';


// Routes are simple javascript object where we define to which url for which part of our app should be presented
const routes: Routes = [
	{path: '', component: PostsComponentComponent},
	{path: 'posts', component: AllPostsComponent},
	{path: 'login', component: LoginComponent},
	{path: 'signup', component: SignupComponent}
];
@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRouterModule{
}