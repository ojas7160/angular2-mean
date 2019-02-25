import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  @Output() blogAdded = new EventEmitter();
  blogs: any = [];
  title: any;
  description: any;
  constructor() { }

  ngOnInit() {
  }

  addBlog() {
    // this.blogs.push({title: this.title, description: this.description});
    this.blogAdded.emit({title: this.title, description: this.description});
  }

}
