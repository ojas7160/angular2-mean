import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Blog } from '../blog.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { BlogService } from '../blogs.service';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, ParamMap } from '@angular/router';
@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  @Output() blogAdded = new EventEmitter<Blog>();
  blogs: any = [];
  title: any;
  description: any;
  imagePreview: string;
  blog: Blog;
  form: NgForm;
  constructor(public blogService: BlogService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('here');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('blogId')) {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.get('blogId')) {
            this.blog = this.blogService.getblogWithoutReq(paramMap.get('blogId'));
            this.blogService.getBlog(paramMap.get('blogId'))
            .subscribe((response) => {
              console.log(response);
              // this.blog = response.blog;
              // this.imagePreview = this.blog.imagePath;
            });
            console.log(this.blog);
          }
        });
      }
    });
  }

  onImageChange(event: Event, form: NgForm) {
    const file = (event.target as HTMLInputElement).files[0]; // to tell typescript that event files is an html element
    console.log(file);
    console.log(form);
    form.value.file = file;
    console.log(form);
    const reader = new FileReader(); // in build js function
    reader.onload = () => { // this is a asyn call
      this.imagePreview = reader.result;
    };
    reader.readAsDataURL(file);
  }

  saveBlog(form: NgForm) {
    console.log('here');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('blogId')) {
        console.log('inside');
        this.blogService.updateBlog(paramMap.get('blogId'), form.value.title, form.value.description, form.value.file);
      } else {
        console.log('form', form);
        if (form.invalid) {
          return;
        }
        this.blogService.addBlogs(form.value.title, form.value.description, form.value.file);
      }
      // if (form.invalid) {
      //   return;
      // }
      // this.blogs.push({title: this.title, description: this.description});
      // this.blogAdded.emit({title: form.value.title, description: form.value.description});
      // this.blogService.addBlogs(form.value.title, form.value.description);
      // form.reset(); // this will reset the form to empty title n desc
      // const blog = {title: form.value.title, description: form.value.description, userId: localStorage.getItem('userId')};
      // this.http.post('http://localhost:3001/api/blogs/create-blogs', blog)
      // .subscribe((response) => {
      //   console.log(response);
      // });
    });
  }
}
