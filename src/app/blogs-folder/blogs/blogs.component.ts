import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Blog } from '../blog.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
import { BlogService } from '../blogs.service';
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
  constructor(public blogService: BlogService) { }

  ngOnInit() {
  }

  addBlog(form: NgForm) {
    console.log('form', form);
    if (form.invalid) {
      return;
    }
    // this.blogs.push({title: this.title, description: this.description});
    // this.blogAdded.emit({title: form.value.title, description: form.value.description});
    this.blogService.addBlogs(form.value.title, form.value.description);
    form.reset(); // this will reset the form to empty title n desc
  }
}
