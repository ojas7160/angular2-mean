import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BlogService } from '../blogs-folder/blogs.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Blog } from '../blogs-folder/blog.model';

@Component({
  selector: 'app-blog-reactive-form',
  templateUrl: './blog-reactive-form.component.html',
  styleUrls: ['./blog-reactive-form.component.css']
})
export class BlogReactiveFormComponent implements OnInit {

  form: FormGroup;
  blog: Blog;
  constructor(public router: Router, public http: HttpClient, private blogService: BlogService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {validators: [Validators.required, Validators.minLength(3)]}),
      description: new FormControl(null, {validators: [Validators.required]}),
      image: new FormControl(null, {validators: [Validators.required]})
    });
      this.route.paramMap.subscribe((paramMap: ParamMap) => {
        if (paramMap.get('blogId')) {
          this.blog = this.blogService.getblog(paramMap.get('blogId'));
          this.blogService.getBlog(paramMap.get('blogId'))
          .subscribe((response) => {
            console.log(response);
            this.blog = response.blog;
            // this.form.setValue({title: response.blog.title, description: response.blog.description});
          });
          console.log(this.blog);
        }
    });
  }

  onImageChange(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({image: file});
    console.log(this.form);
  }

  saveBlog() {
    console.log(';herere');
    console.log('form', this.form);
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('blogId')) {
        this.blogService.updateBlog(this.blog.id, this.form.value.title, this.form.value.description);
      } else {
        console.log('form', this.form);
        if (this.form.invalid) {
          return;
        }
        // this.blogs.push({title: this.title, description: this.description});
        // this.blogAdded.emit({title: form.value.title, description: form.value.description});
        // this.blogService.addBlogs(form.value.title, form.value.description);
        // form.reset(); // this will reset the form to empty title n desc

        // const blog = {title: this.form.value.title, description: this.form.value.description, userId: localStorage.getItem('userId')};
        this.blogService.addBlogs(this.form.value.title, this.form.value.description, localStorage.getItem('userId'));
      }
    });
    this.form.reset();
  }
}
