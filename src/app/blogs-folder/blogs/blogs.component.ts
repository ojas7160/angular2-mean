import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Blog } from '../blog.model';
import { NgForm } from '../../../../node_modules/@angular/forms';
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
  constructor() { }

  ngOnInit() {
  }

  addBlog(form: NgForm) {
    console.log('form', form);
    // this.blogs.push({title: this.title, description: this.description});
    this.blogAdded.emit({title: form.value.title, description: form.value.description});
  }

}
