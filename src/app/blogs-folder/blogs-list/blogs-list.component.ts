import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Blog } from '../blog.model';
import { BlogService } from '../blogs.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-blogs-list',
  templateUrl: './blogs-list.component.html',
  styleUrls: ['./blogs-list.component.css']
})
export class BlogsListComponent implements OnInit, OnDestroy {
  // @Input() blogs: Blog[] = [];
  blogs: Blog[] = [];
  private blogSub: Subscription;
  constructor(public blogService: BlogService) { // automatically creates a property of same name
    // this blogService, we can fetch
    // this variable in the entire file
    // with 'this.blogService' only because
    // of public otherwise we have to define
    // a variable first and assigne it to that
    // variable defined and then use that variable
    // in file.
   }

  ngOnInit() { // runs auto when this component is made. it requires onInit interface to be implemented
    console.log('here-----------');
    // this.blogs = this.blogService.getBlogs();
    console.log('blogs', this.blogs);
    this.blogSub = this.blogService.getBlogUpdatedListener()
    .subscribe((blogs: Blog[]) => {
      this.blogs = blogs;
    });
  }

  ngOnDestroy() {
    this.blogSub.unsubscribe();
  }
}
