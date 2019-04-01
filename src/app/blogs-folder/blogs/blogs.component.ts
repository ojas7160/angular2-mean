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
  blog: Blog;
  form: NgForm;
  constructor(public blogService: BlogService, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit() {
    console.log('here');
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.get('blogId')) {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.get('blogId')) {
            this.blog = this.blogService.getblog(paramMap.get('blogId'));
            this.blogService.getBlog(paramMap.get('blogId'))
            .subscribe((response) => {
              console.log(response);
              this.blog = response.blog;
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
  }

  saveBlog(form: NgForm) {
    if (!!this.blog.id) {
      this.blogService.updateBlog(this.blog.id, form.value.title, form.value.description);
    } else {
      console.log('form', form);
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
      this.blogService.addBlogs(form.value.title, form.value.description, localStorage.getItem('userId'));
    }
  }
}
